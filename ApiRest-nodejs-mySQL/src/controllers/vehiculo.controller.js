const pool = require('../db');

const obtenerVehiculos = async(req, res)=>{
    try {
        const resultado = await pool.query("SELECT vehiculo.id, vehiculo.placa, vehiculo.modelo, vehiculo.marca, tipovehiculo.nombre as tipoVehiculo FROM vehiculo, tipovehiculo WHERE vehiculo.tipoVehiculo = tipovehiculo.id");
        res.status(200).json(resultado[0]);

    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
};

const obtenerVehiculo = async(req, res) =>{
    try {
        const resultado = await pool.query("SELECT * FROM vehiculo WHERE placa=?", [req.params.id,]);
        if (resultado[0].length <= 0) {
            return res.status(404).json({
                'message': 'VEHICULO NO ENCONTRADO'
            });
        }

        res.json(resultado[0]);

    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
};

const crearVehiculo = async(req, res)=>{
    try {
        const { placa, modelo, marca, tipoVehiculo } = req.body;
        const placaMay = placa.toUpperCase();
        await pool.query("INSERT INTO vehiculo (placa, modelo, marca, tipoVehiculo) VALUES (?,?,?,?)",[placaMay, modelo, marca, tipoVehiculo]);
        res.status(200).send({
            'message': 'VEHICULO INSERTARDO ⚡✨',
            placa, 
            modelo, 
            marca,
            tipoVehiculo
        });
    }catch (error) {
        res.status(500).json({
            'message': error
        })
    }
};

const eliminarVehiculo = async(req, res)=>{
    try {
        const resultado = await pool.query("DELETE FROM vehiculo WHERE placa=?", [req.params.id,]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ELIMINAR VEHICULO'
            });
        }
        res.status(200).json({
            'messag': 'VEHICULO ELININADO ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const actualizarVehiculo = async(req, res)=>{
    const { placa, modelo, marca, tipoVehiculo } = req.body;
    const placaMay = placa.toUpperCase();
    try {
        const resultado = await pool.query("UPDATE vehiculo SET placa=?, modelo=?, marca=?, tipoVehiculo=? WHERE id = ?",[placaMay, modelo, marca, tipoVehiculo, req.params.id]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ACTUALIZAR'
            });
        }
        res.status(200).json({
            'message': 'VEHICULO ACTUALIZADO ⚡✨'
        });
    }catch (error) {
        res.status(500).json({
            'message': error
        })
    }
};

module.exports = {
    obtenerVehiculos,
    obtenerVehiculo,
    crearVehiculo,
    eliminarVehiculo,
    actualizarVehiculo
};
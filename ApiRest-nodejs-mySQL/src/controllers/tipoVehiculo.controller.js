const pool = require('../db')

const obtenerTiposVehiculos = async (req, res)=>{
    try {
        const result = await pool.query("SELECT * FROM tipovehiculo");
        res.status(200).json(result[0])
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const crearTiposVehiculos = async (req, res)=>{
    try {
        await pool.query("INSERT INTO tipovehiculo (nombre) VALUES (?)", [req.body.nombre])
        res.status(200).json({
            'message': 'INSERTARDO CORRECTAMENTE ⚡✨'
        })
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const actualizarTiposVehiculos = async (req, res)=>{
    try {
        const resultado = await pool.query("UPDATE tipovehiculo SET nombre=? WHERE id=?", [req.body.nombre, req.params.id])
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ACTUALIZAR'
            });
        }
        res.status(200).json({
            'message': 'ACTUALIZADO CORRECTAMENTE ⚡✨'
        })
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const eliminarTiposVehiculos = async (req, res)=>{
    try {
        const resultado = await pool.query('DELETE FROM tipovehiculo WHERE id=?', [req.params.id])
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ELIMINAR'
            });
        }
        res.status(200).json({
            'messag': 'TIPO DE VEHICULO ELININADO ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

module.exports = {
    obtenerTiposVehiculos,
    crearTiposVehiculos,
    actualizarTiposVehiculos,
    eliminarTiposVehiculos
};
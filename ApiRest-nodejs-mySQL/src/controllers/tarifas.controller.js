const pool = require('../db')

const obtenerTarifas = async (req, res)=>{
    try {
        const result = await pool.query("SELECT tipovehiculo.nombre, tarifas.id, tarifas.primero, tarifas.segundo, tarifas.tercero, tarifas.cuarto, tarifas.quinto FROM tipovehiculo, tarifas WHERE tipovehiculo.id = tarifas.tipoVehiculo")
        res.status(200).json(result[0])
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
};

const obtenerTarifa = async (req, res)=>{
    try {
        const resultado = await pool.query("SELECT * FROM tarifas WHERE id=?", [req.params.id,]);
        if (resultado[0].length <= 0) {
            return res.status(404).json({
                'message': 'TARIFA NO ENCONTRADO'
            });
        }

        res.json(resultado[0]);

    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
};

const agregarTarifa = async (req, res)=>{
    try {
        const {tipoVehiculo, primero, segundo, tercero, cuarto, quinto} = req.body
        await pool.query("INSERT INTO tarifas (tipoVehiculo, primero, segundo, tercero, cuarto, quinto) VALUES (?,?,?,?,?,?)",[tipoVehiculo, primero, segundo, tercero, cuarto, quinto] )
        res.status(200).send({
            'message': 'TARIFA AGREGADA',
            tipoVehiculo, 
            primero, 
            segundo, 
            tercero, 
            cuarto, 
            quinto
        })
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const actualizarTarifa = async (req, res)=>{
    try {
        const {tipoVehiculo, primero, segundo, tercero, cuarto, quinto} = req.body
        const result = await pool.query("UPDATE tarifas SET tipoVehiculo=?, primero=?, segundo=?, tercero=?, cuarto=?, quinto=? WHERE id=?",[tipoVehiculo, primero, segundo, tercero, cuarto, quinto, req.params.id] )
        if (result[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ACTUALIZAR'
            });
        }
        res.status(200).json({
            'message': 'TARIFA ACTUALIZADA ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const eliminarTarifa = async (req, res)=>{
    try {
        const resultado = await pool.query("DELETE FROM tarifas WHERE id=?", [req.params.id,]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ELIMINAR TARIFA'
            });
        }
        res.status(200).json({
            'messag': 'TARIFA ELININADA ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

module.exports = {
    obtenerTarifas,
    obtenerTarifa,
    agregarTarifa,
    actualizarTarifa,
    eliminarTarifa
}
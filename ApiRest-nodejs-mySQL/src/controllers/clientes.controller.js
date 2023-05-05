const pool = require('../db');

const obtenerClientes = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM cliente");
        res.status(200).json(resultado[0]);

    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
};

const obtenerCliente = async (req, res) => {
  try {
        const resultado = await pool.query("SELECT * FROM cliente WHERE cedula=?", [req.params.id]);
        if (resultado[0].length <= 0) {
            return res.status(404).json({
                'message': 'CLIENTE NO ENCONTRADO'
            });
        }

        res.json(resultado[0]);

    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
};

const crearCliente = async (req, res) => {
    try {
        const { nombre, apellidos, cedula, telefono } = req.body;
        await pool.query("INSERT INTO cliente (nombre, apellidos, cedula, telefono) VALUES (?,?,?,?)",[nombre, apellidos, cedula, telefono]);
        res.status(200).send({
            'message': 'CLIENTE INSERTARDO ⚡✨',
            nombre,
            apellidos,
            cedula,
            telefono
        });
    }catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const eliminarCliente = async (req, res) => {
    try {
        const resultado = await pool.query("DELETE FROM cliente WHERE id=?", [req.params.id]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ELIMINAR CLIENTE'
            });
        }
        res.status(200).json({
            'messag': 'USUARIO ELININADO ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const actualizarCliente = async (req, res) => {
    const { nombre, apellidos, cedula, telefono } = req.body;
    try {
        const resultado = await pool.query("UPDATE cliente SET nombre=?, apellidos=?, cedula=?, telefono=? WHERE id=?", [nombre, apellidos, cedula, telefono, req.params.id]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ACTUALIZAR'
            });
        }
        res.status(200).json({
            'message': 'USUARIO ACTUALIZADO ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const actualizarCliente2 = async (req, res) => {
    const { nombre, apellidos, cedula, telefono } = req.body;
    try {
        const resultado = await pool.query("UPDATE cliente SET nombre=IFNULL(?, nombre), apellidos=IFNULL(?,apellidos), cedula=IFNULL(?, cedula), telefono=IFNULL(?, telefono) WHERE cedula=?",[nombre, apellidos, cedula, telefono, req.params.id]);
        if (resultado[0].affectedRows <= 0) {
            return res.json({
                'message': 'ERROR AL ACTUALIZAR'
            });
        }
        res.status(200).json({
            'message': 'USUARIO ACTUALIZADO ⚡✨'
        });

    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

module.exports = {
  obtenerClientes,
  obtenerCliente,
  crearCliente,
  eliminarCliente,
  actualizarCliente,
  actualizarCliente2,
};

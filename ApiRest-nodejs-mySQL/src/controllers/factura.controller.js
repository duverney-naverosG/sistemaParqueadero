const pool = require('../db');
const moment = require('moment');

const obtenerFacturas = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT factura.id, factura.fecha, factura.valor, factura.tiempo, vehiculo.placa, cliente.cedula, cliente.nombre, cliente.apellidos, tarifas.primero, tarifas.segundo, tarifas.tercero, tarifas.cuarto, tarifas.quinto FROM factura, vehiculo, cliente, tarifas, tipovehiculo WHERE factura.id_vehiculo = vehiculo.id AND factura.id_cliente = cliente.id AND vehiculo.tipoVehiculo = tipovehiculo.id AND vehiculo.tipoVehiculo = tarifas.id AND factura.fechaSalida IS NULL ORDER BY factura.fecha DESC;");
        const fecha = new Date();
        // fecha.setHours(2,50)
        let facturas = resultado[0].map((factura)=>{
            let fechaFactura = new moment(factura.fecha);
            let fechaActual = new moment(fecha);
            let diferenciaHora = Math.abs(fechaActual.diff(fechaFactura, 'hours'))
            let diferenciaMinutos = Math.abs(fechaActual.diff(fechaFactura, 'minutes'))
            let diferenciaDias = Math.abs(fechaActual.diff(fechaFactura, 'days'));
            let valor = 0
            let tiempoTotal = 0;

            if(diferenciaMinutos < 30){
                valor = factura.primero;
                tiempoTotal = `${diferenciaMinutos} minutos`
            }else if(diferenciaMinutos> 30 && diferenciaMinutos<59){
                valor = factura.segundo;
                tiempoTotal = `${diferenciaMinutos} minutos`
            }else if (diferenciaHora >= 1 && diferenciaHora <= 4){
                valor = factura.tercero * diferenciaHora;
                tiempoTotal = `${diferenciaHora} hora/s`
            }else if(diferenciaHora > 4 && diferenciaDias < 15){
                valor = factura.cuarto;
                if(diferenciaHora<24){
                    tiempoTotal = `${diferenciaHora} hora/s`
                }else{
                    tiempoTotal = `${diferenciaDias} Dia/s`
                }
            }else if(diferenciaDias>=15){
                valor = factura.quinto ;
                tiempoTotal = `${diferenciaDias} dia/s`
            }
            

            return {
                'id': factura.id,
                'fecha_ingreso': factura.fecha.toLocaleString(),
                'fecha_actual': fecha.toLocaleString(), 
                'valor': valor,
                'tiempo': tiempoTotal,
                'placa': factura.placa,
                'cliente': factura.cedula,
                'nombre':`${factura.nombre} ${factura.apellidos}`
            }
        })
        res.json(facturas)
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
};

const obtenerHistorial = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM factura WHERE fechaSalida IS NOT NULL ORDER BY fecha DESC;");
        
        let facturas = resultado[0].map((factura)=>{
            return {
                'id': factura.id,
                'fecha': factura.fecha.toLocaleString(),
                'fechaSalida': factura.fechaSalida.toLocaleString(), 
                'valor': factura.valor,
                'tiempo': factura.tiempo
            }
        })
        
        res.status(200).json(facturas);

    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
    
};

const obtenerFactura = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT factura.id, factura.fecha, factura.fechaSalida, factura.valor, factura.tiempo, vehiculo.placa, cliente.cedula, cliente.nombre, cliente.apellidos, tarifas.primero, tarifas.segundo, tarifas.tercero, tarifas.cuarto, tarifas.quinto FROM factura, vehiculo, cliente, tarifas, tipovehiculo WHERE factura.id = ? AND factura.id_vehiculo = vehiculo.id AND factura.id_cliente = cliente.id AND vehiculo.tipoVehiculo = tipovehiculo.id AND vehiculo.tipoVehiculo = tarifas.id ",[req.params.id]);
        const fecha = new Date()
        //fecha.setHours(9,10)
        if (resultado[0].length <= 0) {
            return res.status(404).json({
                'message': 'FACTURA NO REGISTRADA'
            })
        }

        let fechaFactura = new moment(resultado[0][0].fecha);
        let fechaActual = new moment(fecha);
        let diferenciaHora = Math.abs(fechaActual.diff(fechaFactura, 'hours'))
        let diferenciaMinutos = Math.abs(fechaActual.diff(fechaFactura, 'minutes'))
        let diferenciaDias = Math.abs(fechaActual.diff(fechaFactura, 'days'));
        let valor = 0
        let tiempoTotal = 0;
        
        if(diferenciaMinutos < 30){
            valor = resultado[0][0].primero;
            tiempoTotal = `${diferenciaMinutos} minutos`
        }else if(diferenciaMinutos> 30 && diferenciaMinutos<59){
            valor = resultado[0][0].segundo;
            tiempoTotal = `${diferenciaMinutos} minutos`
        }else if (diferenciaHora >= 1 && diferenciaHora <= 4){
            valor = resultado[0][0].tercero * diferenciaHora;
            tiempoTotal = `${diferenciaHora} hora/s`
        }else if(diferenciaHora > 4 && diferenciaDias < 15){
            valor = resultado[0][0].cuarto;
            if(diferenciaHora<24){
                tiempoTotal = `${diferenciaHora} hora/s`
            }else{
                tiempoTotal = `${diferenciaDias} Dia/s`
            }
        }else if(diferenciaDias>=15){
            valor = resultado[0][0].quinto ;
            tiempoTotal = `${diferenciaDias} dia/s`
        }

        res.json({
            'id': resultado[0][0].id,
            'fecha_ingreso': resultado[0][0].fecha.toLocaleString(),
            'valor': valor,
            'tiempo': tiempoTotal,
            'placa': resultado[0][0].placa,
            'cedula': resultado[0][0].cedula,
            'nombre':`${resultado[0][0].nombre} ${resultado[0][0].apellidos}`
        })

    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        });
    }
    
};

const crearFactura = async (req, res) => {
    try {
        const fecha = new Date();
        const { placa, cedula} = req.body
        const idCliente = await pool.query("SELECT id FROM cliente WHERE cedula=?;", [cedula]);
        const idVehiculo = await pool.query("SELECT id FROM vehiculo WHERE placa=?;", [placa]);
        await pool.query("INSERT INTO factura (fecha, id_vehiculo, id_cliente) VALUES (?,?,?)",[fecha,idVehiculo[0][0].id, idCliente[0][0].id]);
        res.status(200).send({
            'message': 'FACTURA INSERTARDO ⚡✨',
            'cliente ': idCliente[0][0].id,
            'id vehiculo ': idVehiculo[0][0].id
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const eliminarFactura = async (req, res) => {
    try {
        const resultado = await pool.query("DELETE FROM factura WHERE id=?", [req.params.id]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ELIMINAR FACTURA'
            });
        }
        res.status(200).json({
            'messag': 'FACTURA ELININADO ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const actualizarFactura = async (req, res) => {
    try {
        const {placa, cedula} = req.body;
        const idCliente = await pool.query("SELECT id FROM cliente WHERE cedula=?;", [cedula]);
        const idVehiculo = await pool.query("SELECT id FROM vehiculo WHERE placa=?;", [placa]);
        const resultado = await pool.query("UPDATE factura SET  id_vehiculo=?, id_cliente=? WHERE id=?", [ idVehiculo[0][0].id, idCliente[0][0].id, req.params.id]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ACTUALIZAR'
            });
        }
        res.status(200).json({
            'message': 'FACTURA ACTUALIZADO ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const pagar = async (req, res) => {
    try {
        const {valor, tiempo} = req.body;
        const fecha = new Date();
        const resultado = await pool.query("UPDATE factura SET fechaSalida=?, valor=?, tiempo=? WHERE id=?", [fecha, valor, tiempo, req.params.id]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ACTUALIZAR'
            });
        }
        res.status(200).json({
            'message': 'FACTURA ACTUALIZADO ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
};

const volver = async (req, res )=>{
    try {
        const resultado = await pool.query("UPDATE factura SET fechaSalida=?, valor=?, tiempo=? WHERE id=?", [null, 0, 0, req.params.id]);
        if (resultado[0].affectedRows <= 0) {
            return res.status(404).json({
                'message': 'ERROR AL ACTUALIZAR'
            });
        }
        res.status(200).json({
            'message': 'FACTURA ACTUALIZADO ⚡✨'
        });
    } catch (error) {
        res.status(500).json({
            'message': 'ERROR...🚨⚡'
        })
    }
}

module.exports = {
    obtenerFacturas,
    obtenerFactura,
    obtenerHistorial,
    crearFactura,
    eliminarFactura,
    actualizarFactura,
    volver,
    pagar
};
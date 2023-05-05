const router = require('express').Router()

const {obtenerFacturas, obtenerFactura, obtenerHistorial, crearFactura, eliminarFactura, volver, actualizarFactura, pagar} = require('../controllers/factura.controller')


router.get('/facturas',obtenerFacturas )

router.get('/historial',obtenerHistorial )

router.get('/facturas/:id',obtenerFactura )

router.post('/facturas', crearFactura)

router.delete('/facturas/:id', eliminarFactura)

router.put('/facturas/:id', actualizarFactura)

router.put('/historial/:id', pagar)

router.put('/historial/volver/:id', volver)

module.exports.router = router
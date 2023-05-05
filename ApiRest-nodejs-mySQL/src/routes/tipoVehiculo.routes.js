const router = require('express').Router()

const {obtenerTiposVehiculos, crearTiposVehiculos, actualizarTiposVehiculos, eliminarTiposVehiculos} = require('../controllers/tipoVehiculo.controller')


router.get('/tipoVehiculo', obtenerTiposVehiculos)

router.post('/tipoVehiculo/', crearTiposVehiculos)

router.delete('/tipovehiculo/:id', eliminarTiposVehiculos)

router.put('/tipoVehiculo/:id', actualizarTiposVehiculos)

module.exports.router = router
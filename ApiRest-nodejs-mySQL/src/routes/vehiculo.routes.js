const router = require('express').Router()

const {obtenerVehiculos, obtenerVehiculo, crearVehiculo, eliminarVehiculo, actualizarVehiculo} = require('../controllers/vehiculo.controller')

router.get('/vehiculos', obtenerVehiculos)

router.get('/vehiculos/:id', obtenerVehiculo)

router.post('/vehiculos', crearVehiculo)

router.delete('/vehiculos/:id', eliminarVehiculo)

router.put('/vehiculos/:id', actualizarVehiculo)

module.exports.router = router

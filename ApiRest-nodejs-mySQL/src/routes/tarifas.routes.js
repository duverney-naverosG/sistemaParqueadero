const router = require('express').Router()

const {obtenerTarifas, obtenerTarifa, agregarTarifa, actualizarTarifa, eliminarTarifa} = require('../controllers/tarifas.controller')

router.get('/tarifas',obtenerTarifas )

router.get('/tarifas/:id',obtenerTarifa )

router.post('/tarifas', agregarTarifa)

router.delete('/tarifas/:id', eliminarTarifa)

router.put('/tarifas/:id', actualizarTarifa)

module.exports.router = router
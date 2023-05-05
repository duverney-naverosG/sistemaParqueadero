const router = require('express').Router()

const {obtenerClientes, obtenerCliente, crearCliente, eliminarCliente, actualizarCliente, actualizarCliente2} = require('../controllers/clientes.controller')


router.get('/clientes',obtenerClientes )

router.get('/clientes/:id',obtenerCliente )

router.post('/clientes', crearCliente)

router.delete('/clientes/:id', eliminarCliente)

router.put('/clientes/:id', actualizarCliente)

router.patch('/clientes/:id', actualizarCliente2)

module.exports.router = router

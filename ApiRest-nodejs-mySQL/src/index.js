// IMPORTAR PAQUETES CON MODULOS 
//import express from 'express'

//IMPORTAR PAQUETES ANTERIORMENTE 
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const {join} = require('path')

const routerCliente = require('./routes/cliente.routes')
const routerTvehiculo = require('./routes/tipoVehiculo.routes')
const routerTarifas = require('./routes/tarifas.routes')
const routerVehiculo = require('./routes/vehiculo.routes')
const routerFacturas = require('./routes/factura.routes')

//configuraciones y middleware
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

//uso de documentos estaticos 
app.use(express.static(join(__dirname, './public')))

//ruta de inicio 
app.get('/', (req, res)=>{
    res.sendFile('./public/home.html', {root: __dirname })
})

//rutas de la API
app.use('/api/',routerCliente.router)
app.use('/api/',routerTvehiculo.router)
app.use('/api/',routerTarifas.router)
app.use('/api/',routerVehiculo.router)
app.use('/api/',routerFacturas.router)

//ruta para rutas no configuradas 
app.use((req, res, next)=>{
    res.status(404).json({
        "message": "pagina no encontrada"
    })
    next();
})

//puerto y mensaje
app.listen(process.env.PORT, ()=>{
    console.log("🛸🌍🚀 puerto encendido " + process.env.PORT)
})


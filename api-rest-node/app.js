'use strict'

//Requires
var express = require('express');
var bodyParser = require('body-parser');
//Ejecutar express
var app = express();

//Cargar archivos de rutas

//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Reescribir rutas

//Ruta / metodo de prueba
app.get('/prueba',(req, res) => {
    return res.status(200).send({
        nombre: "David Garcia",
        message: 'Hola Mundo'
    });
});

//Exportar el modulo
module.exports = app;
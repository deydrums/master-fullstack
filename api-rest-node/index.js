'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 80;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_node', {useNewUrlParser: true})
.then(() =>{
    console.log('La conexion a la base de datos de mongo se ha realizado con exito')
    //Crear el servidor
    app.listen(port, ()=>{
        console.log('El servidor esta corriendo correctamente localhost:80')
    });
}).catch((error) =>{
    console.log(error)
});


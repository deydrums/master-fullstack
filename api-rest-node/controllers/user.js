'use strict'
// var Project = require('../models/project');
// var fs = require('fs');
// var path = require('path');

var controller = {
    probando: function(req, res) {
        return res.status(200).send({
            message: "Soy el metodo probando",
        });
    },

    testeando: function(req, res){
        return res.status(200).send({
            message: "Soy el metodo testeando",
        });
    },

    save: function(req, res){
        //Recoger los parametros de la peticion 

        //Validar los datos

        //Crar objeto de usuario

        //Asignar valores al usuario

        //Comprobar si el usuario existe

        //Si no existe, cifrar la contraseña

        //Guardar el usuario

        //Devolver respuesta

        return res.status(200).send({
            message: "Registro de usuarios",
        });
    }
}

module.exports = controller;
'use strict'

var validator = require('validator');
var User = require('../models/user');
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
        var params = req.body;
        //Validar los datos
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);
        
        //console.log(validate_name, validate_surname, validate_email, validate_password);
        var erro = "Verifica que el ";
        if(!validate_name){ erro += 'nombre, '}
        if(!validate_surname){erro += 'apellido, '}
        if(!validate_email){erro += 'email, '}
        if(!validate_password){erro += 'contraseña, '}
        erro += 'sea correcto.'

        if( validate_name && validate_surname && validate_email && validate_password){
            //Crear objeto de usuario
            //Asignar valores al usuario

            //Comprobar si el usuario existe

            //Si no existe, cifrar la contraseña

            //Guardar el usuario

            //Devolver respuesta
        }else{
            return res.status(400).send({
                message: erro
            }); 
        }


        return res.status(200).send({
            message: "Registro de usuarios"

        });
    }


}



module.exports = controller;
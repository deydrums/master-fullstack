'use strict'

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-node');
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
            var user = new User();
            //Asignar valores al usuario
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_USER';
            user.image = null;
            
            //Comprobar si el usuario existe
            User.findOne({email: user.email},(err, issetUser) => {
                if(err) {
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad del usuario"
                    });  
                }
                if(!issetUser) {
                    //Si no existe, cifrar la contraseña
                    bcrypt.hash(params.password, null, null, function(err , hash){
                        user.password = hash;
                        //Guardar el usuario
                        user.save((err, userStored)=>{
                            if(err) {
                                return res.status(500).send({
                                    message: "Error al guardar el usuario"
                                });  
                            }

                            if(!userStored) {
                                return res.status(500).send({
                                    message: "Error al guardar el usuario"
                                });    
                            }else{
                                //Devolver respuesta
                                return res.status(200).send({
                                    status: "success",
                                    message: "El usuario se ha registrado exitosamente",
                                    user:userStored
                                });  
                            }

                        });

                    });

                }else{
                    return res.status(400).send({
                        message: "El correo ya ha sido registrado anteriormente"
                    });  
                }
            });

        }else{
            return res.status(400).send({
                message: erro
            }); 
        }
    },

    login: function(req, res){
        //Recoger los parametros de la peticion

        //Validar los datos

        //Buscar usuarios que coincidan con el email

        //Si lo encuentra

        //Comprobar la contraseña (Cuincidencia con email y password)

        //Si es correcto

        //Generar token de jwt y devolverlo

        //Devolver los datos

        return res.status(200).send({message: 'Metodo de login'});
    }

}



module.exports = controller;
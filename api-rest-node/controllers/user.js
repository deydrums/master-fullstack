'use strict'

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-node');
var jwt = require('../services/jwt')
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
        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        }catch(err){
            return res.status(400).send({status: 'error', message: "Rellena todos los campos"}); 
        }
        //console.log(validate_name, validate_surname, validate_email, validate_password);
        var erro = "Verifica que el ";
        if(!validate_name){ erro += 'nombre, '}
        if(!validate_surname){erro += 'apellido, '}
        if(!validate_email){erro += 'email, '}
        if(!validate_password){erro += 'password, '}
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
        var params = req.body;
        //Validar los datos
        try{
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        }catch(err){
            return res.status(400).send({status: 'error', message: "Rellena todos los campos"}); 
        }
        var erro = "Verifica que el ";
        if(!validate_email){erro += 'email, '}
        if(!validate_password){erro += 'password, '}
        erro += 'sea correcto.'
        //Validar los datos
        if(!validate_email || !validate_password){
            return res.status(400).send({
                message: erro
            }); 
        }
        //Buscar usuarios que coincidan con el email
        User.findOne({email: params.email.toLowerCase()},(err, user)=>{

            if(err) {
                return res.status(500).send({message: 'Error al intentar identificarse'});
            }
            if(!user) {
                return res.status(404).send({message: 'El usuario no existe.'});
            }
            //Si lo encuentra
            //Comprobar la contraseña (Cuincidencia con email y password)
            bcrypt.compare(params.password,user.password,(err,check) => {
                //Si es correcto
                if(check){
                    //Generar token de jwt y devolverlo
                    if(params.gettoken){
                        return res.status(200).send({status: 'success', token: jwt.createToken(user)});
                    }else{
                        //Limpiar el objeto
                        user.password = undefined;
                        //Devolver los datos
                        return res.status(200).send({status: 'success', user});
                    }
                }else{
                    return res.status(500).send({status: 'error', message: 'Credenciales invalidas  '});
                }

            });

        });

    },

    update: function(req, res){

        //Recoger los datos del usuario
        var params = req.body;
        //Validar datos del usuario
        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        }catch(err){
            return res.status(400).send({status: 'error', message: "Rellena todos los campos"}); 
        }
       //console.log(validate_name, validate_surname, validate_email, validate_password);
        var erro = "Verifica que el ";
        if(!validate_name){ erro += 'nombre, '}
        if(!validate_surname){erro += 'apellido, '}
        if(!validate_email){erro += 'email, '}
        erro += 'sea correcto.' ;

        if( !validate_name || !validate_surname || !validate_email){
            return res.status(400).send({message: erro}); 
        }

        //Eliminar propiedades innecesarias
        delete params.password;
        var userId = req.user.sub;

        //Comprobar si el email es unico
        if(req.user.email != params.email)  {
            //Buscar usuarios que coincidan con el email
            User.findOne({email: params.email.toLowerCase()},(err, user)=>{

                if(err) {
                    return res.status(500).send({message: 'Error al intentar actualizar datos'});
                }
                if(user && user.email == params.email) {
                    return res.status(400).send({message: 'El email ya esta registrado.'});
                }else{



                    //Buscar y actualizar documento
                    //User.findOneAndUpdate(condicion, datos a actualizar, opciones, callabak)
                    User.findByIdAndUpdate({_id: userId},params,{new:true},(err,userUpdate)=>{
                        if(err){
                            return res.status(500).send({status: 'error', message: "Error al actualizar usuario"}); 
                        }
                        if(!userUpdate){
                            return res.status(500).send({status: 'error', message: "El usuario no existe"}); 
                        }
                        //Devolver respuesta
                        return res.status(200).send({status: 'success', message: 'Usuario actualizado', user:userUpdate});
                    });



                }
            });
        }else{

            //Buscar y actualizar documento
            //User.findOneAndUpdate(condicion, datos a actualizar, opciones, callabak)
            User.findByIdAndUpdate({_id: userId},params,{new:true},(err,userUpdate)=>{
                if(err){
                    return res.status(500).send({status: 'error', message: "Error al actualizar usuario"}); 
                }
                if(!userUpdate){
                    return res.status(500).send({status: 'error', message: "El usuario no existe"}); 
                }
                //Devolver respuesta
                return res.status(200).send({status: 'success', message: 'Usuario actualizado', user:userUpdate});
            });

        
        }

    },

    uploadAvatar: function(req, res){
        //Configurar el modulo multiparty (md)
        //Recoger el fichero de la peticion
        //Conseguir el nombre y la extension del archivo
        //Comprobar extension (Solo imagenes), si no es valida, borrar fichero subido
        //Sacar el id del usuario identificado
        //Buscar y actualizar documento de la base datos

        //Devolver respuesta
        return res.status(200).send({status: 'success', message: 'Avatar subido'});
    }

}



module.exports = controller;
'use strict'

var validator = require('validator');
var Topic = require('../models/topic');

var controller ={

    test: function(req, res){
        return res.status(200).send({message: "Hola"});
    },

    save: function(req, res){
        //Recoger los parametros de la peticion
        var params = req.body;
        //Validar los datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            var validate_lang = !validator.isEmpty(params.lang);
        }catch(e){
            return res.status(400).send({status: "error",message:"Faltan datos para enviar"});
        }
        var erro = "Verifica que el ";
        if(!validate_title){ erro += 'titulo, '}
        if(!validate_content){erro += 'contendio, '}
        if(!validate_lang){erro += 'lenguaje, '}
        erro += 'sea correcto.' ;

        if( !validate_title || !validate_content || !validate_lang){
            return res.status(400).send({status: 'error', message: erro}); 
        }

        //Crear objeto a guardar
        var topic = new Topic();
        //Asignar valores
        topic.title = params.title;
        topic.content = params.content;
        topic.code = params.code;
        topic.lang = params.lang;
        //Guardar el topic
        topic.save((err, topicStored)=>{
            if(err || !topicStored){
                return res.status(400).send({status: 'error', message: "No se ha guardado el topic"});
            }
            //Devolver una respuesta
            return res.status(200).send({status: 'success', message: "Topic Guardado",topic: topicStored});
        });

    }
}

module.exports = controller;
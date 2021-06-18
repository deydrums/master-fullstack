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
        topic.user = req.user.sub;
        //Guardar el topic
        topic.save((err, topicStored)=>{
            if(err || !topicStored){
                return res.status(400).send({status: 'error', message: "No se ha guardado el temas"});
            }
            //Devolver una respuesta
            return res.status(200).send({status: 'success', message: "Tema Guardado",topic: topicStored});
        });

    },

    getTopics: function(req, res){

        //Cargar la libreria de paginacion en la clase ------> Modelo
        //Recoger la pagina actual
        var page = req.params.page;
        if(req.params.page == null || req.params.page ==undefined || !req.params.page || req.params.page == 0 || req.params.page == '0'){
            var page = 1;
        }else{
            var page = parseInt(req.params.page);
        }
        //Indicar las opciones de paginacion
        var options = {
            sort: {date: -1},
            populate: 'user',
            limit: 4,
            page: page

        };
        //Find paginador
        //Devolver resultado (topics, total, total de paginas)
        Topic.find().exec((err,topics)=>{
            if(err || !topics){
                return res.status(404).send({status: 'error', message: 'No se han encontrado temas.'});
            }
            return res.status(200).send({status: 'success', topics, page,options});
        });
    }
}

module.exports = controller;
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
        Topic.paginate({}, options,(err, topics)=>{
            if(err){
                return res.status(400).send({status: 'error', message: "Error al hacer la consulta"});
            }
            if(!topics){
                return res.status(400).send({status: 'error', message: "No se han encontrado temas"});
            }
            //Devolver resultado (topics, total, total de paginas)
            return res.status(200).send({status: 'success', topics: topics.docs, totalDocs: topics.totalDocs, totalPages: topics.totalPages});
        });
        //Devolver resultado (topics, total, total de paginas)
        // Topic.find().exec((err,topics)=>{
        //     if(err || !topics){
        //         return res.status(404).send({status: 'error', message: 'No se han encontrado temas.'});
        //     }
        //     return res.status(200).send({status: 'success', topics, page,options});
        // });
    },

    getMyTopicsByUser: function(req, res){
        //Conseguir el id del usuario de la url
        var userId = req.params.user;
        //Find con la condicion de usuarios
        Topic.find({user: userId}).sort([['date','descending']]).exec((err,topics)=>{
            if(err){    
                return res.status(404).send({status: 'error', message: 'Error en la peticion.'});
            }
            if(!topics || topics == ''){
                return res.status(404).send({status: 'error', message: 'No se han encontrado temas.'});
            }
            return res.status(200).send({status: 'success', topics});
        });
    },
    
    getTopic: function(req, res) {
        var topicId = req.params.id;

        Topic.findById(topicId).populate('user').exec((err,topic)=>{
            if(err || !topic){
                return res.status(404).send({status: 'error', message: 'No se han encontrado el tema.'});
            }
            return res.status(200).send({status: 'success', topic});
        });
    },

    update: function(req, res){
        //Recoger los parametros de la peticion
        var params = req.body;
        var topicId = req.params.id;
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

        //Montar un objeto json con los datos modificables
        var update = {
            title: params.title,
            content: params.content,
            code: params.code,
            lang: params.lang
        };
        
        //Find and update del topic por id y por id de usuario
        Topic.findOneAndUpdate({_id: topicId, user: req.user.sub},update,{new:true}, (err, topicUpdated)=>{
            if(err){
                return res.status(400).send({status: "error",message:"No se ha podido actualizar el tema"});
            }
            if(!topicUpdated){
                return res.status(400).send({status: "error",message:"No existe el tema o no es tuyo"});
            }
            return res.status(200).send({status: 'success',  topic: topicUpdated});
        });

        
    }
}

module.exports = controller;
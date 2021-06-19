'use strict'

var validator = require('validator');
var Topic = require('../models/topic');

var controller ={

    add: function(req, res){
        //Recoger el id del topic de la url
        var params = req.body;
        var topicId = req.params.topicId;
        //Find por id del topic
        Topic.findById(topicId).exec((err,topic) => {
            if(err || !topic) {
                return res.status(404).send({status: "error",message:"No se ha encontrado el tema"});
            }

            //Validar los datos
            try{
                var validate_content = !validator.isEmpty(params.content);
            }catch(e){
                return res.status(400).send({status: "error",message:"Faltan datos para enviar"});
            }
            var erro;
            if(!validate_content){erro = "Verifica que el contenido sea correcto."}

            if(!validate_content){
                return res.status(400).send({status: 'error', message: erro}); 
            }
            
            var comment ={
                user: req.user.sub,
                content: req.body.content
            };
            //En la propiedad comments del objeto resultante hacer un push
            topic.comments.push(comment);
            //Guardar el topic completo
            topic.save((err) =>{
                if(err){
                    return res.status(400).send({status: 'error', message: 'Error al guardar comentario'}); 
                }
                //Devolver una respuesta
                return res.status(200).send({status: 'success',  topic});
            });

        });

    },
    update: function(req, res){

        //Conseguir id del comentario que llega de la url
        var commentId = req.params.commentId;
        //Recoger datos y validar
        var params = req.body;

        //Validar los datos
        try{
            var validate_content = !validator.isEmpty(params.content);
        }catch(e){
            return res.status(400).send({status: "error",message:"Faltan datos para enviar"});
        }
        var erro = "Verifica que el contenido sea correcto.";
        if(!validate_content){
            return res.status(400).send({status: 'error', message: erro}); 
        }
        //console.log(req.user.sub);
        //Find and update de subdocumentos
        Topic.findOneAndUpdate(
            {"comments._id": commentId},
            {"$set":{"comments.$[com].content": params.content}},
            {new:true, arrayFilters: [{"com.user": req.user.sub, "com._id": commentId}]},
            (err, topicUpdated)=>{
                if(err) {
                    return res.status(400).send({status: 'error', message: 'Error al actualizar el comentario'}); 
                }
                if(!topicUpdated) {
                    return res.status(400).send({status: 'error', message: 'Error, el comentario no existe o no es tuyo'}); 
                }
                //Devolver una respuesta
                return res.status(200).send({status: 'success',  topic: topicUpdated});  
            });

    },
    delete: function(req, res){
        return res.status(200).send({status: 'success',  topic: 'Metodo de borrado de comentarios'});
    }
};

module.exports = controller;
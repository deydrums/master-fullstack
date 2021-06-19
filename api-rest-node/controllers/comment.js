'use strict'

var validator = require('validator');
var Topic = require('../models/topic');

var controller ={

    add: function(req, res){
        return res.status(200).send({status: 'success',  topic: 'Metodo de agregar comentarios'});
    },
    update: function(req, res){
        return res.status(200).send({status: 'success',  topic: 'Metodo de actualizar comentarios'});
    },
    delete: function(req, res){
        return res.status(200).send({status: 'success',  topic: 'Metodo de borrado de comentarios'});
    }
};

module.exports = controller;
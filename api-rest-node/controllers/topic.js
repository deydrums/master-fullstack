'use strict'

var controller ={

    test: function(req, res){
        return res.status(200).send({message: "Hola"});
    },

    save: function(req, res){
        //Recoger los parametros de la peticion
        //Validar los datos
        //Crear objeto a guardar
        //Asignar valores
        //Guardar el topic

        //Devolver una respuesta
        return res.status(200).send({message: "Guardar topic"});
    }
}

module.exports = controller;
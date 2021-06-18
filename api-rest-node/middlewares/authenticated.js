'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Esta es una clave super-secreta%^53*';


exports.authenticated = function(req, res, next) {
    //Comprobar si llega autorizacion
    if(!req.headers.authorization){
        return res.status(400).send({status: 'error', message:'No estas autenticado'});
    }

    //Limpiar el token y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g, '');
    
    try{
        //Decodificar el token 
        var payload = jwt.decode(token,secret);
        //Comprobar si el token ha expirado
        if(payload.exp <= moment().unix()){
            return res.status(400).send({status: 'error', message:'El token ha expirado'});
        }

    }catch(ex){
        return res.status(400).send({status: 'error', message:'El token no es valido'});
    }

    

    //Adjuntar usuario identificado a la request
    req.user = payload;
    //Pasar a la accion
    next();
};
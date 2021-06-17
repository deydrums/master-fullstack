'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String, 
    password: String,
    image: String,
    roles: String
});

module.exports = mongoose.model('User', UserSchema);
                                //lowercase y pluralizar el nombre
                                //users -> documentos (schema)
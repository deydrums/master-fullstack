'use strict'

exports.authenticated = function(req, res, next) {
    console.log('Estas pasando el middleware');
    next();
};
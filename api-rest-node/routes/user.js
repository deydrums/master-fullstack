'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.get('/probando',UserController.probando);
router.get('/testeando',UserController.testeando);


module.exports = router;
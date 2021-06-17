'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.get('/probando',UserController.probando);
router.get('/testeando',UserController.testeando);


router.post('/register',UserController.save);

module.exports = router;
'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir:'./uploads/users'})

var router = express.Router();
var md_auth = require('../middlewares/authenticated');

router.get('/probando',UserController.probando);
router.get('/testeando',UserController.testeando);


router.post('/register',UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated, UserController.update);
router.post('/upload-avatar', [md_upload, md_auth.authenticated], UserController.uploadAvatar);

module.exports = router;
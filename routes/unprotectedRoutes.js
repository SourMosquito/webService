const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');
const sesionController = require('../controllers/SesionController');
const passwordController = require('../controllers/PasswordController');

module.exports = function(){
    router.post('/users', usersController.add);
    router.post('/login', sesionController.login);
    router.post('/password-recovery', passwordController.resetearPassword);
    router.post('/validate-token', passwordController.validarToken);
    router.post('/update-password', passwordController.saveNewPassword);
    return router;
};
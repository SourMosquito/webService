const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');
const sesionController = require('../controllers/SesionController');

module.exports = function(){
    router.post('/users', usersController.add);
    router.post('/login', sesionController.login);

    return router;
};
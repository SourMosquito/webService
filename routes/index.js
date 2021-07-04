const express = require('express');
const { accessControl } = require('../middlewares/accessControl');

const router = express.Router();

//importar archivos de rutas
const establishmentRoutes = require('./establishmentRoutes');
const usersRoutes = require('./usersRoutes');
const categoryRoutes = require('./categoryRoutes');

module.exports = () => {
 

    //vincular router de cada archivo de rutas
    usersRoutes(router, accessControl);
    establishmentRoutes(router, accessControl);
    categoryRoutes(router, accessControl);
    return router;
};
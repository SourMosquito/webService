const express = require('express');
const { accessControl } = require('../middlewares/accessControl');

const router = express.Router();

//importar archivos de rutas
const establishmentRoutes = require('./establishmentRoutes');
const usersRoutes = require('./usersRoutes');
const menuRoutes = require('./menuRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');

module.exports = () => {
 

    //vincular router de cada archivo de rutas
    usersRoutes(router, accessControl);
    establishmentRoutes(router, accessControl);
    categoryRoutes(router, accessControl);
    productRoutes(router, accessControl);
    menuRoutes(router, accessControl);
    return router;
};
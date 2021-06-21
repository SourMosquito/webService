const express = require('express');

const router = express.Router();

//importar archivos de rutas
const establishmentRoutes = require('./establishmentRoutes');

module.exports = () => {
 

    //vincular router de cada archivo de rutas
    establishmentRoutes(router);
    return router;
};
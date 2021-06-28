const establishmentController = require('../controllers/EstablishmentController');

module.exports = (router) => {
    //rutas del recurso establishment

    router.post('/establishment', establishmentController.add);
    router.get('/establishment', establishmentController.list);
    router.get('/establishment/:id', establishmentController.show);
    router.put('/establishment/:id', establishmentController.update);
    router.delete('/establishment/:id', establishmentController.delete);

    return router;
};

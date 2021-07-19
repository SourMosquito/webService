const establishmentController = require('../controllers/EstablishmentController');

module.exports = (router, accessControl) => {
    //rutas del recurso establishment

    //Establecimientos del usuario autenticado
    router.post('/establishment', accessControl('createOwn', 'establishment'), establishmentController.add);
    router.get('/establishment', accessControl('readOwn', 'establishment'), establishmentController.list);
    router.get('/establishment/:id', accessControl('readOwn', 'establishment'), establishmentController.show);
    router.put('/establishment/:id', accessControl('updateOwn', 'establishment'), establishmentController.update);
    router.delete('/establishment/:id', accessControl('deleteOwn', 'establishment'), establishmentController.delete);

    //acceso a establecimientos con super usuario
    router.get('/manage-establishments', accessControl('readAny', 'establishment'), establishmentController.listAll);
    
    return router;
};

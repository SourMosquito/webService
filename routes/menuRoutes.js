const menusController = require('../controllers/MenusController');

module.exports = (router, accessControl) => {
    //rutas del recurso products
    router.post('/establishment/:establishment/menu', accessControl('readOwn', 'category'), menusController.add);
    router.get('/establishment/:establishment/menu', accessControl('readOwn', 'category'), menusController.list);
    router.put('/establishment/:establishment/menu/:id', accessControl('readOwn', 'category'), menusController.update);
    router.delete('/establishment/:establishment/menu/:id', accessControl('readOwn', 'category'), menusController.delete);

    return router;
};
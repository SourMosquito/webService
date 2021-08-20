const orderController = require('../controllers/OrdersController');

module.exports = (router, accessControl) => {
    //rutas del recurso order

    //Pedidos del usuario autenticado
    router.post('/order', accessControl('createOwn', 'order'), orderController.add);
    router.get('/order', accessControl('readOwn', 'order'), orderController.list);
    router.get('/order/:id', accessControl('readOwn', 'order'), orderController.show);
    router.put('/order/:id', accessControl('updateOwn', 'order'), orderController.update);
    router.delete('/order/:id', accessControl('deleteOwn', 'order'), orderController.delete);
    return router;
};
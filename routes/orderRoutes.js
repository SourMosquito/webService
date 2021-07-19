const orderController = require('../controllers/OrdersController');

module.exports = (router, accessControl) => {
    //rutas del recurso order

    //Pedidos del usuario autenticado
    router.post('/order', accessControl('createOwn', 'order'), orderController.add);

    return router;
};
const orderController = require('../controllers/OrdersController');

module.exports = (router, accessControl) => {
    router.post('/orders', accessControl('createOwn', 'orders'), orderController.add);
    router.delete('/orders/:id', accessControl('readOwn', 'orders'), orderController.delete);

    return router;
};
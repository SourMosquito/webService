const productsController = require('../controllers/ProductsController');

module.exports = (router) => {
    //rutas del recurso products
    router.post('/category/:category/product', productsController.add);
    router.get('/category/:category/product', productsController.list);
    router.put('/category/:category/product/:id', productsController.update);
    router.delete('/category/:category/product/:id', productsController.delete);

    return router;
};
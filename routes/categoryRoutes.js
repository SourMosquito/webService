const categoryController = require('../controllers/CategoriesController');

module.exports = (router, accessControl) => {
    

    //Categorias del usuario autenticado
    router.post('/category', accessControl('createOwn', 'category'), categoryController.add);
    router.get('/category', accessControl('readOwn', 'category'), categoryController.list);
    router.get('/category/:id', accessControl('readOwn', 'category'), categoryController.show);
    router.put('/category/:id', accessControl('updateOwn', 'category'), categoryController.update);
    router.delete('/category/:id', accessControl('deleteOwn', 'category'), categoryController.delete)
    
    return router;
};

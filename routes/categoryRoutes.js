const categoryController = require('../controllers/CategoriesController');

module.exports = (router, accessControl) => {
    

    //Categorias del usuario autenticado
    router.post('/menu/:menu/category', accessControl('readOwn', 'category'), categoryController.add);
    router.get('/menu/:menu/category', accessControl('readOwn', 'category'), categoryController.list);
    //router.get('/category/:id', accessControl('readOwn', 'category'), categoryController.show);
    router.put('/menu/:menu/category/:id', accessControl('updateOwn', 'category'), categoryController.update);
    router.delete('/menu/:menu/category/:id', accessControl('deleteOwn', 'category'), categoryController.delete)
    
    return router;
};

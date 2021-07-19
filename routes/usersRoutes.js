const usersController = require('../controllers/UsersController');


module.exports = (router, accessControl) => {
    router.get('/users', accessControl('readAny', 'user'), usersController.list);
    router.get('/users/:id', accessControl('readAny', 'user'), usersController.show);
    router.get('/profile', accessControl('readOwn', 'profile'), usersController.profile);

    return router;
};
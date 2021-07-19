const AccessControl = require('accesscontrol');

const ac = new AccessControl();

//definir roles del mas inferior al superior
//nunguno, usuario, admin, y super

exports.roles = () => {
    ac.grant('ninguno');
    //aqui los permisos de rol: ninguno

    ac.grant('user')
    .readOwn(['profile', 'establishment', 'menu', 'category', 'product', 'order'])
    .createOwn(['profile', 'establishment','menu', 'category', 'product', 'order']);

    ac.grant('super')
    .extend('user')//heredar rol
    .readAny(['user', 'establishment', 'menu', 'category', 'product', 'order']) //poder leer los usuarios
    .updateAny(['user', 'establishment', 'menu', 'category', 'product', 'order'])
    .deleteAny(['user', 'establishment', 'menu', 'category', 'product', 'order']);

    return ac;
};

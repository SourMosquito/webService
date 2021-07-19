const AccessControl = require('accesscontrol');

const ac = new AccessControl();

//definir roles del mas inferior al superior
//nunguno, usuario, admin, y super

exports.roles = () => {
    ac.grant('ninguno');
    //aqui los permisos de rol: ninguno

    ac.grant('user')
    .readOwn(['profile', 'establishment', 'category'])
    .createOwn(['profile', 'establishment', 'category']);

    ac.grant('super')
    .extend('user')//heredar rol
    .readAny(['user', 'establishment', 'category']) //poder leer los usuarios
    .updateAny(['user', 'establishment', 'category'])
    .deleteAny(['user', 'establishment', 'category']);

    return ac;
};

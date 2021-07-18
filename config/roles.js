const AccessControl = require('accesscontrol');

const ac = new AccessControl();

//definir roles del mas inferior al superior
//nunguno, usuario, admin, y super

exports.roles = () => {
    ac.grant('ninguno');
    //aqui los permisos de rol: ninguno

    ac.grant('user')
    .readOwn(['profile', 'establishment', 'category', 'order'])
    .createOwn(['profile', 'establishment', 'category', 'order']);

    ac.grant('super')
    .extend('user')//heredar rol
    .readAny(['user', 'establishment', 'category', 'order']) //poder leer los usuarios
    .updateAny(['user', 'establishment', 'category', 'order'])
    .deleteAny(['user', 'establishment', 'category', 'order']);

    return ac;
};

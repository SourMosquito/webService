const AccessControl = require('accesscontrol');

const ac = new AccessControl();

//definir roles del mas inferior al superior
//nunguno, usuario, admin, y super

exports.roles = () => {
    ac.grant('ninguno');
    //aqui los permisos de rol: ninguno

    ac.grant('user')
    .readOwn('profile', 'establishment')
    .createOwn(['profile', 'establishment']);

    ac.grant('super')
    .extend('user')//heredar rol
    .readAny(['user', 'establishment']) //poder leer los usuarios
    .updateAny(['user', 'establishment'])
    .deleteAny(['user', 'establishment']);

    return ac;
};

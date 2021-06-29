const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.add = async (request, response, next) => {
    try {
        //Validar que venga la contraseña
        if(!request.body.password){
            response.status(400).json({ message: 'La contraseña es obligatoria'});
            next();
        }

        const datosUsuario = {...request.body};
        const salt = await bcrypt.genSalt(10);
        datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);
        //Registrar Usuario
        const usuario = await User.create(datosUsuario);

        usuario.password = null; //para evitar enviarlo en la respuesta

        response.json({ message: 'usuario registrado', usuario});
    } catch (error) {
        console.log(error);

        let errores = [];
        if(error.errors) {
            errores = error.errors.map( errorItem => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }
        response.json({ error: true, mensaje: 'Error al registar al usuario', errores});
    };
};

//Listar Usuarios
exports.list = async (req, res, next) => {
    try {
        const usuarios = await User.findAll({});
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        response.json({mensaje: 'Error al leer usuarios'});
    }
};


//Leer usuario
exports.show = async(req, res, next) => {
    try{
        const usuario = await User.findByPk(req.params.id);
        usuario.password = null;
        if(!usuario){
            res.status(404).json({message: 'No se encontro el usuario'});
        } else{
            res.json(usuario);
        }
    }catch (errror){
        console.log(error);
        response.status(503).json({mensaje: 'Error al leer el usuario'});
    }
};

//mostrar mi perfil
exports.profile = async(req, res, next) => {
    try{
        const usuario = await User.findByPk(req.user.id);
        //usuario.password = null;
        if(!usuario){
            res.status(404).json({message: 'No se encontro el usuario'});
        } else{
            usuario.password = null;
            res.json(usuario);
        }
    }catch (errror){
        console.log(error);
        response.status(503).json({mensaje: 'Error al leer el perfil de usuario'});
    }
};
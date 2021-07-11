const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const { User } = require('../models');
//const user = require('../models/user');

const { passwordEmail } = require('../utils/passwordEmail');

exports.resetearPassword = async (request, response, next) => {
    try {
        //comprobar qe se reciba el email
        if(!request.body.email) {
            response.status(400).json({
                error: true,
                message: 'Debe proporcionar el email.'
            });
        }

        //buscar el usuario con ese email
        const usuario = await User.findOne({
            where: {email: request.body.email}
        });

        if(!usuario) {
            response.status(404).json({message: 'No existe el usuario'});
        }

        //generar el token de recuperación de contraseña
        let token = await bcrypt.hash(usuario.email + Date.now().toString(), 10);
        token = token.replace(/\//g, "l");
        //guardar el token
        usuario.passwordResetToken = token;
        usuario.passwordResetExperire = Date.now() + 3600000; //expira en una hora

        await usuario.save();

        //enviar el email
        const resultadoEmail = await passwordEmail(
            `${usuario.name} ${usuario.lastname}`,
            usuario.email,
            token
        );

        if (resultadoEmail) {
            response.json({ message: 'Un mensaje ha sido enviado al email proporcionado'});
        }else {
            response.status(503).json({ error: true, message: 'Ocurrio un error al enviar el email de recuperacion',})
        }
        
    } catch (error) {
        console.log(error);
        response.status(503).json({ error: true, message: 'Ocurrio un error al intentar enviar el email de recuperacion',})
    }
};


exports.validarToken = async (request, response, next) => {
    try {
        //buscar el usuario con el token y vigencia
        const usuario = await User.findOne({
            where: {
                passwordResetToken: request.body.token,
                passwordResetExperire: {[Op.gt]: new Date()}, //el token sea vigente
            }
        });

        if(!usuario) {
            response.status(400).json({
                message: 'El link de restablecer contraseña es invalido o a expirado'
            });
        }
        // en caso de que si lo encuentre retornar un status de que si es válido
        response.json({
            isValid: true,
            message: 'Ingrese una nueva contraseña.',
        });

    } catch (error) {
        console.log(error);
        response.status(503).json({ message: 'Error al validar el token.'});
    }
};

exports.saveNewPassword = async (request, response, next ) => {
    try {
        //volver a validar el token
        const usuario = await User.findOne({
            where: {
                passwordResetToken: request.body.token,
                passwordResetExperire: {[Op.gt]: new Date()}, //el token sea vigente
            }
        });

        if(!usuario) {
            response.status(400).json({
                message: 'El link de restablecer contraseña es invalido o a expirado'
            });
        }

        //validar que se reciba la contraseña
        if (!request.body.password){
            response.status(400).json({message: 'La contraseña es obligatoria.'});
        }

        //cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
       
        //cifrar la contraseña
        usuario.password = await bcrypt.hash(request.body.password, salt);

        //quitar el token de recuperación
        usuario.passwordResetToken = '';
        usuario.passwordResetExperire = null;

        //guardar cambios
        await usuario.save();
        response.json({ message: 'La nueva contraseña ha sido guardada. Inicie sesión.'});
    } catch (error) {
        console.log(error);
        response.status(503).json({ message: 'Error al guardar contraseña.'});
    }
};
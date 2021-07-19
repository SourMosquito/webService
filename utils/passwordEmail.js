const nodemailer = require('nodemailer');

exports.passwordEmail = async (name, email, token) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.SERVIDOR_SMTP,
            port: 587,
            secure: false,
            auth: {
                user: process.env.USUARIO_SMTP,
                pass: process.env.PASSWORD_SMTP,
            },
        });

        let mensaje = `Hola, ${name}<br>`;
        mensaje += 'Haz solicitado restaurar tu contraseña, ';
        mensaje += `<a href="http://localhost:3000/restablecer-contrasena/${token}">Haz clic aquí</a><br>`;
        mensaje += 'El enlace es valido solo por una hora desde su envío.';


        let info = await transporter.sendMail({
            from: 'Tania Martinez <taniae.martinez18@utim.edu.mx>',
            to: `${name}<${email}>`,
            subject: "Recperación de contraseña",
            html: mensaje,
        });

        console.log("Message sent: %s", info.messageId);

        return true;

    }   catch (error) {
        console.log(error);
        return false;
    }
};
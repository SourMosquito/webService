const { response } = require('express');
const { Order } = require('../models');

//Agregar pedido
exports.add = async (request, response, next) => {
    try {

        //asociar el pedido al usuario autenticado
        const order = await Order.create({ ...request.body, UserId: request.user.id});

        response.json({
            mensaje: 'Se ha registrado el pedido.',
            order,
        });
    } catch (error) {
        
        let errores = [];
        if (error.errors) {
            errores = error.errors.map( errorItem => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }

        response.status(503).json({
            error: true,
            mensaje: 'Error al registrar el pedido.',
            errores,
        });
    }
};

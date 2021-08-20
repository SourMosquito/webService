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


//Listar pedidos
exports.list = async (req, res, next) => {
    try{
        const orders = await Order.findAll({ where: {UserId: req.user.id } });

        res.json(orders);
    } catch (error) {
        response.status(503).json({ error: true, message: 'Error al leer el pedido.'})
    }
};

//Mostrar pedido
exports.show = async (req, res, next) => {
    try{
        const order = await Order.findOne(
        {
            where: { id: req.params.id, UserId: req.user.id, }
        },);

        if (!order) {
            res.status(404).json({ error: true, message: 'No se encontro el pedido.'})
        } else {
            res.json(order);
        }
    } catch (error) {
        res.status(503).json({ error: true, message: 'Error al leer el pedido.'})
    }
};

//Actualizar pedido
exports.update = async (req, res, next) => {
    try {
        const order = await Order.findOne(
            {
                where: { id: req.params.id, UserId: req.user.id }
            },);

        if (!order) {
            res.status(404).json({ mensaje: 'No se encontro el pedido.'})
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                order[propiedad] = req.body[propiedad];
            });

            await order.save();
            res.json({ mensaje: 'El pedido fue actualizado.'});

        }
    }   catch (error) {
        let errores = [];
        if (error.errors) {
            errores = error.errors.map( errorItem => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }

        res.status(503).json({
            error: true,
            mensaje: 'Error al actualizar el pedido.',
            errores,
        });
    }
};


//Eliminar pedido
exports.delete = async (req, res, next) => {
    try {
        const order = await Order.findOne(
            {
                where: { id: req.params.id, UserId: req.user.id }
            },);

        if (!order) {
            res.status(404).json({ mensaje: 'No se encontro el pedido.' })
        } else {
            await order.destroy();
            res.json({ mensaje: 'El pedido fue eliminado.' });
        }
    }   catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar el pedido.' })
    }
};

//Mostrar productos del pedido
exports.show = async (req, res, next) => {
    try{
        const order = await Order.findByPk( req.params.id, { include: 'products' },);

        if (!order) {
            res.status(404).json({ error: true, message: 'No se encontro el pedido.'})
        } else {
            res.json(order);
        }
    } catch (error) {
        res.status(503).json({ error: true, message: 'Error al leer el pedido.'})
    }
};

// Acciones para super administrador
exports.listAll = async (req, res, next) => {
    try{
        const orders = await Order.findAll({});

        res.json(orders);
    } catch (error) {
        response.status(503).json({ mensaje: 'Error al leer el pedido.'})
    }
};
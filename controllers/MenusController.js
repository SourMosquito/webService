const { request } = require('express');
const { Menu } = require('../models');

//Agregar producto
exports.add = async (request, response, next) => {
    try {

        // asociar el producto a la categoría (se recibe como parámetro)
        const datosMenu = { ...request.body };
        datosMenu.EstablismentId = request.params.establishment;

        const menu = await Menu.create(datosMenu);

        response.json({
            mensaje: 'Se ha registrado el menu.',
            menu,
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
            mensaje: 'Error al registrar el menu.',
            errores,
        });
    }
};

//Listar menus
exports.list = async (req, res, next) => {
    try{
        const menus = await Menu.findAll({
            where: { EstablishmentId: req.params.establishment },
        });

        res.json(menus);
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al leer el menu.'})
    }
};

//Actualizar menu
exports.update = async (req, res, next) => {
    try {
        const menu = await Menu.findOne(
            {
                where: { EstablishmentId: req.params.establishment, id: req.params.id },
            });

        if (!menu) {
            res.status(404).json({ mensaje: 'No se encontro el menu.'})
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                menu[propiedad] = req.body[propiedad];
            });

            await menu.save();
            res.json({ mensaje: 'El menu fue actualizado.'});

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
            mensaje: 'Error al actualizar el menu.',
            errores,
        });
    }
};

//Eliminar menu
exports.delete = async (req, res, next) => {
    try {
        const menu = await Menu.findOne(
            {
                where: { EstablishmentId: req.params.establishment, id: req.params.id },
            });

        if (!menu) {
            res.status(404).json({ mensaje: 'No se encontro el menu.' })
        } else {
            await menu.destroy();
            res.json({ mensaje: 'El menu fue eliminado.' });
        }
    }   catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar el menu.' })
    }
};
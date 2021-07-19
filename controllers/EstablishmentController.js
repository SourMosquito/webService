const { response } = require('express');
const { Establishment } = require('../models');

//Agregar establecimiento
exports.add = async (request, response, next) => {
    try {

        //asociar el establecimiento al usuario autenticado
        const establishment = await Establishment.create({ ...request.body, UserId: request.user.id});

        response.json({
            mensaje: 'Se ha registrado el establecimiento.',
            establishment,
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
            mensaje: 'Error al registrar el proyecto.',
            errores,
        });
    }
};

//Listar establecimientos
exports.list = async (req, res, next) => {
    try{
        const establishments = await Establishment.findAll({ where: {UserId: req.user.id } });

        res.json(establishments);
    } catch (error) {
        response.status(503).json({ mensaje: 'Error al leer el establecimiento.'})
    }
};

//Mostrar establecimiento
exports.show = async (req, res, next) => {
    try{
        const establishment = await Establishment.findOne(
        {
            where: { id: req.params.id, UserId: req.user.id, }
        },);

        if (!establishment) {
            res.status(404).json({ mensaje: 'No se encontro el establecimiento.'})
        } else {
            res.json(establishment);
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al leer el establecimiento.'})
    }
};

//Actualizar establecimiento
exports.update = async (req, res, next) => {
    try {
        const establishment = await Establishment.findOne(
            {
                where: { id: req.params.id, UserId: req.user.id }
            },);

        if (!establishment) {
            res.status(404).json({ mensaje: 'No se encontro el establecimiento.'})
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                establishment[propiedad] = req.body[propiedad];
            });

            await establishment.save();
            res.json({ mensaje: 'El establecimiento fue actualizado.'});

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
            mensaje: 'Error al actualizar el establecimiento.',
            errores,
        });
    }
};

//Eliminar establecimiento
exports.delete = async (req, res, next) => {
    try {
        const establishment = await Establishment.findOne(
            {
                where: { id: req.params.id, UserId: req.user.id }
            },);

        if (!establishment) {
            res.status(404).json({ mensaje: 'No se encontro el establecimiento.' })
        } else {
            await establishment.destroy();
            res.json({ mensaje: 'El establecimiento fue eliminado.' });
        }
    }   catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar el establecimiento.' })
    }
};

// Acciones para super administrador
exports.listAll = async (req, res, next) => {
    try{
        const establishments = await Establishment.findAll({});

        res.json(establishments);
    } catch (error) {
        response.status(503).json({ mensaje: 'Error al leer el establecimiento.'})
    }
};

//Mostrar menus del establecimiento
exports.show = async (req, res, next) => {
    try{
        const establishment = await Establishment.findByPk( req.params.id, { include: 'menus' },);

        if (!establishment) {
            res.status(404).json({ mensaje: 'No se encontro el establecimiento.'})
        } else {
            res.json(establishment);
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al leer el establecimiento.'})
    }
};
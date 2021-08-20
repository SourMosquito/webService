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
            message: 'Error al registrar el establecimiento.',
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
            res.status(404).json({ error: true, message: 'No se encontró el establecimiento.'})
        } else {
            res.json(establishment);
        }
    } catch (error) {
        res.status(503).json({  error: true, message: 'Error al leer el establecimiento.'})
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
            res.status(404).json({ error: true, message: 'No se encontró el establecimiento.'})
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                establishment[propiedad] = req.body[propiedad];
            });

            await establishment.save();
            res.json({ message: 'El establecimiento fue actualizado.'});

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
            message: 'Error al actualizar el establecimiento.',
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
            res.status(404).json({ error: true, message: 'No se encontró el establecimiento.' })
        } else {
            await establishment.destroy();
            res.status(200).json({ error: true, message: 'El establecimiento fue eliminado.' });
        }
    }   catch (error) {
        res.status(503).json({ error: true, message: 'Error al eliminar el establecimiento.' })
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
            res.status(404).json({ error: true, message: 'No se encontró el establecimiento.'})
        } else {
            res.json(establishment);
        }
    } catch (error) {
        res.status(503).json({ error: true, message: 'Error al leer el establecimiento.'})
    }
};
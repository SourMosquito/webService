const { response } = require('express');
const { Category } = require('../models');

exports.add = async (req, res, next) => {
    try {
        await Category.create(req.body);
        res.json({ mensaje: 'Se agrego la categoría'});
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al agregar la categoría'});
        next();
    }
};

exports.list = async (req, res, next) => {
    try {
        const category = await Category.findAll({});
        res.json(category);
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al leer las categorias'});
        next();
    }
};

exports.show = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            res.status(404).json({ mensaje: 'No se encontró la categoria.'});
        } else {
            res.json(category);
        } 
    } catch (error) {
            res.status(503).json({ mensaje: 'Error al leer la categoria.'});
        }
    };

    exports.update = async (req, res, next) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                res.status(404).json({ mensaje: 'No se encontro la categoria.'});
            } else {
                Object.keys(req.body).forEach((propiedad) => {
                    category[propiedad] = req.body[propiedad];
                });
    
                category.save();
                res.json({ mensaje: 'El registro fue actualizado.'})
            }
        } catch (error) {
            let errores = [];
            if (error.errors) {
                errores = error.errors.map((item) => ({
                    campo: item.path,
                    error: item.message,
                }));
            }
    
            res.json({
                error: true,
                mensaje: 'Error al actualizar la categoria',
                errores,
            });
        }
    };


    exports.delete = async (req, res, next) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                res.status(404).json({ mensaje: 'No se encontro la categoria. '});
            } else {
                await category.destroy();  
                res.json({ mensaje: 'La categoria fue eliminada.' });
            }
        } catch (error) {
            res.status(503).json({ mensaje: 'Error al eliminar la categoria.'});
        }
    };
    
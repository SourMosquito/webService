const { response } = require('express');
const { Category } = require('../models');

//Agregar categoría
exports.add = async (request, response, next) => {
    try {

        // asociar la categoria al menu (se recibe como parámetro)
        const datosCategory = { ...request.body };
        datosCategory.MenuId = request.params.menu;

        const category = await Category.create(datosCategory);

        response.json({
            mensaje: 'Se ha registrado la categoría.',
            category,
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
            mensaje: 'Error al registrar la categoría.',
            errores,
        });
    }
};

//Listar categorías
exports.list = async (req, res, next) => {
    try{
        const categories = await Category.findAll({
            where: { MenuId: req.params.menu },
        });

        res.json(categories);
    } catch (error) {
        res.status(503).json({ error: true, message: 'Error al leer las categorías.'})
    }
};

//Actualizar categoría
exports.update = async (req, res, next) => {
    try {
        const category = await Category.findOne(
            {
                where: { MenuId: req.params.menu, id: req.params.id },
            });

        if (!category) {
            res.status(404).json({ mensaje: 'No se encontro la categoría.'})
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                category[propiedad] = req.body[propiedad];
            });

            await category.save();
            res.json({ mensaje: 'La categoría fue actualizada.'});

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
            message: 'Error al actualizar la categoría.',
            errores,
        });
    }
};


exports.delete = async (req, res, next) => {
    try {
        const category = await Category.findOne(
            {
                where: { MenuId: req.params.menu, id: req.params.id },
            });

        if (!category) {
            res.status(404).json({ error: true, message: 'No se encontro la categoría.' })
        } else {
            await category.destroy();
            res.json({ error: true, message: 'La categoría fue eliminada.' });
        }
    }   catch (error) {
        res.status(503).json({ error: true, message: 'Error al eliminar la categoría.' })
    }
};
    

exports.show = async (req, res, next) => {
    try{
        const category = await Category.findByPk( req.params.id, { include: 'menus' },);

        if (!category) {
            res.status(404).json({ error: true, message: 'No se encontró la categoria.'})
        } else {
            res.json(category);
        }
    } catch (error) {
        res.status(503).json({ error: true, message: 'Error al leer la categoria.'})
    }
};
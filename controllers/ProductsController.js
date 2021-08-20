const { request } = require('express');
const { Product } = require('../models');

//Agregar producto
exports.add = async (request, response, next) => {
    try {

        // asociar el producto a la categoría (se recibe como parámetro)
        const datosProduct = { ...request.body };
        datosProduct.CategoryId = request.params.category;

        const product = await Product.create(datosProduct);

        response.json({
            mensaje: 'Se ha registrado el producto.',
            product,
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
            mensaje: 'Error al registrar el producto.',
            errores,
        });
    }
};

//Listar productos
exports.list = async (req, res, next) => {
    try{
        const products = await Product.findAll({
            where: { CategoryId: req.params.category },
        });

        res.json(products);
    } catch (error) {
        res.status(503).json({ error: true, message: 'Error al leer el producto.'})
    }
};

//Actualizar producto
exports.update = async (req, res, next) => {
    try {
        const product = await Product.findOne(
            {
                where: { CategoryId: req.params.category, id: req.params.id },
            });

        if (!product) {
            res.status(404).json({ mensaje: 'No se encontro el producto.'})
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                product[propiedad] = req.body[propiedad];
            });

            await product.save();
            res.json({ mensaje: 'El producto fue actualizado.'});

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
            mensaje: 'Error al actualizar el producto.',
            errores,
        });
    }
};

//Eliminar producto
exports.delete = async (req, res, next) => {
    try {
        const product = await Product.findOne(
            {
                where: { CategoryId: req.params.category, id: req.params.id },
            });

        if (!product) {
            res.status(404).json({ mensaje: 'No se encontro el producto.' })
        } else {
            await product.destroy();
            res.json({ mensaje: 'El producto fue eliminado.' });
        }
    }   catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar el producto.' })
    }
};
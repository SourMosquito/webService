const { request } = require('express');
const { Order } = require('../models');

exports.add = async (req, res, next) => {
  
    try {
      await Order.create(req.body);

      res.json({ mensaje: 'Nuevo pedido agregado' });
    } catch (error) {
      console.error(error);
      res.json({mensaje: 'Error al agregar el pedido'});
      next();
    }
  };


  exports.list = async (req, res, next) => {
    try{
        const order = await Order.findAll({
            where: { UserId: req.params.user },
        });

        res.json(products);
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al leer el pedido.'})
    }
};


exports.delete = async (req, res, next) => {
    try {
        const order = await Order.findOne(
            {
                where: { UserId: req.params.user, id: req.params.id },
            });

        if (!product) {
            res.status(404).json({ mensaje: 'No se encontro el pedido.' })
        } else {
            await product.destroy();
            res.json({ mensaje: 'El pedido fue eliminado.' });
        }
    }   catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar el pedido.' })
    }
};
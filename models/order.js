'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Order.belongsTo(models.User);
      models.Order.hasMany(models.Product, {
        as: 'products',
      });
    }
  };
  Order.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    total: DataTypes.DOUBLE,
    paymentMethod: DataTypes.STRING,
    finalized: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
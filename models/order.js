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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo."
        },
        len: {
          args: [3, 255],
          msg: "El nombre del pedido tiene que ser entre 4 y 200 caracteres."
        }
    },
  },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo."
        },
        isDecimal: {
          msg: "El total solo acepta valores númericos y decimales."
        }
    },
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo no puede ser nulo."
      },
  },
},
    paymentMethod: DataTypes.STRING,
    finalized: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
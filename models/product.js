'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Product.belongsTo(models.Category);
      models.Product.hasMany(models.Order, {
        as: 'orders',
      });
    }
  };
  Product.init({
    CategoryId: DataTypes.INTEGER,
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          len: {
            args: [3, 255],
            msg: "El nombre del producto tiene que ser entre 3 y 255 caracteres."
          }
      },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          len: {
            args: [3, 255],
            msg: "La descripción del producto tiene que ser entre 3 y 255 caracteres."
          }
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo."
        },
        isDecimal: {
          msg: "El precio del producto solo acepta valores númericos y decimales."
        }
    },
  },
    available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
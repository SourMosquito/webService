'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Category.belongsTo(models.Menu);
      models.Category.hasMany(models.Product, {
        as: 'products',
      });
    }
  };
  Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          len: {
            args: [3, 255],
            msg: "El nombre de la categoría tiene que ser entre 3 y 255 caracteres."
          }
      },
    },
    description:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          len: {
            args: [3, 255],
            msg: "La descripción de la categoría tiene que ser entre 3 y 255 caracteres."
          }
      },
    },
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
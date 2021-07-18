'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Menu.belongsTo(models.Establishment);
      models.Menu.hasMany(models.Category, {
        as: 'categories',
      });
    }
  };
  Menu.init({
    EstablishmentId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo."
        },
        len: {
          args: [3, 255],
          msg: "El nombre del menú tiene que ser entre 3 y 255 caracteres."
        }
    },
  },
    
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};
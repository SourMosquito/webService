'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Establishment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Establishment.belongsTo(models.User);
      models.Establishment.hasMany(models.Menu, {
        as: 'menus',
      });
    }
  };
  Establishment.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          len: {
            args: [3, 255],
            msg: "El nombre del establecimieno tiene que ser entre 3 y 255 caracteres."
          }
      },
    },
    description: DataTypes.STRING,
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          len: {
            msg: "La dirección del establecimieno tiene que ser entre 3 y 255 caracteres."
          }
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo."
        },
        isNumeric: {
          msg: "El número del establecimiento solo acepta valores númericos."
        }
    },
  },
    available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Establishment',
  });
  return Establishment;
};

'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo no puede ser nulo."
          },
          isAlpha: {
            args: true,
            msg: "El nombre solo puede contener letras."
          },
          len: {
            args: [3, 255],
            msg: "El nombre tiene que ser entre 3 y 255 caracteres."
          }
      },
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo."
        },
        isAlpha: {
          args: true,
          msg: "El apellido solo puede contener letras."
        },
        len: {
          args: [3, 255],
          msg: "El apellido tiene que ser entre 3 y 255 caracteres."
        }
    },
  },

  email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "El campo tiene que ser un correo valido."
        }
      }
  },

  role: DataTypes.STRING,
  password: DataTypes.STRING,
  passwordResetToken: DataTypes.STRING,
  passwordResetExperire: DataTypes.DATE,
  active: DataTypes.BOOLEAN

  }, {});

User.associate = function(models){
  models.User.hasMany(models.Establishment, {
    as: 'establishments',
  });
  models.User.hasMany(models.Order, {
    as: 'orders',
  });
};
User.prototype.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

  return User;
};
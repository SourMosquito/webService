'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExperire: DataTypes.DATE,
    active: DataTypes.BOOLEAN

  }, {});

User.associate = function(models){
  models.User.hasMany(models.Establishment, {
    as: 'establishments',
  })
};
User.prototype.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

  return User;
};
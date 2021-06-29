'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up:  (queryInterface, Sequelize) => {

    const salt = bcrypt.genSaltSync(10);
    
      return queryInterface.bulkInsert('Users', [{
        name: 'Tania',
        lastname: 'Martinez',
        email: 'tania.martinez@gmail.com',
        role: 'super',
        password: bcrypt.hashSync('1234', salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maria',
        lastname: 'Lopez',
        email: 'maria.lopez@gmail.com',
        role: 'user',
        password: bcrypt.hashSync('1234', salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    //Add commands to revert seed here.
     return queryInterface.bulkDelete('Users', null, {});
     
  }
};

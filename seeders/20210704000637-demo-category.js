'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      //Add seed commands here.
     
      Example:
      await queryInterface.bulkInsert('Categories', [{
        name: 'Comidas',
        description: 'Ingrese aquí todas las comidas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bebidas',
        description: 'Aquí se encuentran todas las bebidas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    //Add commands to revert seed here.
     
      //Example:
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};

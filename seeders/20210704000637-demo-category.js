'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      //Add seed commands here.
     
      Example:
      await queryInterface.bulkInsert('Categories', [{
        MenuId: '1',
        name: 'Comidas',
        description: 'Ingrese aquí todas las comidas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        MenuId: '1',
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

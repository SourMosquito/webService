'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Menus', [{
      Establishmentid: 6,
      name: 'Menu 1',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(), 
     },
     {
      Establishmentid: 6,
      name: 'Menu 2',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(), 
     },
     {
      Establishmentid: 6,
      name: 'Menu 3',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(), 
     },
     {
      Establishmentid: 2,
      name: 'Menu 4',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(), 
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Menus', null, {});

  }
};

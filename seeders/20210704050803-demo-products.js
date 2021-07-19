'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        CategoryId: 2,
        name: 'Spaguetti',
        description: 'Pasta con queso',
        price: 50.20,
        available: true,
        createdAt: new Date (),
        updatedAt: new Date (),
      },
      {
        CategoryId: 3,
        name: 'Agua de jamaica',
        description: 'Agua sabor jamaica',
        price: 10.20,
        available: true,
        createdAt: new Date (),
        updatedAt: new Date (),
      },
      {
        CategoryId: 2,
        name: 'Torta de jamon',
        description: 'Torta con jamon, quesillo, aguacate, frijoles y tomate',
        price: 25.00,
        available: true,
        createdAt: new Date (),
        updatedAt: new Date (),
      },
      {
        CategoryId: 3,
        name: 'Agua de horchata',
        description: 'Agua sabor horchata',
        price: 11.00,
        available: true,
        createdAt: new Date (),
        updatedAt: new Date (),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [{
      name: 'Pedido 1',
      UserId: 1,
      ProductId: 1,
      price: 45,
      quantity: 1,
      total: 45,
      finaliced: true,
      createdAt: new Date(),
      updatedAt: new Date(), 
    },
    {
      name: 'Pedido 2',
      UserId: 2,
      ProductId: 3,
      price: 15,
      quantity: 1,
      total: 15,
      finaliced: false,
      createdAt: new Date(),
      updatedAt: new Date(), 
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    
   await queryInterface.bulkDelete('Orders', null, {});

  }
};

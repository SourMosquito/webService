'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      //Add seed commands here.
     
      Example:
      await queryInterface.bulkInsert('Orders', [{
        id: 1,
        UserId: '1',
        name: 'Pedido 1',
        total: 3535,
        paymentMethod: 'Efectivo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        UserId: '2',
        name: 'Pedido 2',
        total: 321,
        paymentMethod: 'Tarjeta de credito',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Products', 'OrderId', {
          type: Sequelize.DataTypes.INTEGER,
          after: "CategoryId",
          references: {
            model: "Orders",
            key: "id",
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Products', 'OrderId', { transaction: t })
      ]);
    });
  }
};

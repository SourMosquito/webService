'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Categories', 'MenuId', {
          type: Sequelize.DataTypes.INTEGER,
          after: "id",
          references: {
            model: "Menus",
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
        queryInterface.removeColumn('Categories', 'MenuId', { transaction: t })
      ]);
    });
  }
};

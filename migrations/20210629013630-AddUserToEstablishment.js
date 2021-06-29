'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Establishments', 'UserId', {
          type: Sequelize.DataTypes.INTEGER,
          after: "id",
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }, { transaction: t }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Establishments', 'UserId', { transaction: t }),
      ]);
    });
  }
};

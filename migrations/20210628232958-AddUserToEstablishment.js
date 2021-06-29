'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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

        }, { transaction: t}),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Establishments', 'UserId', { transaction: t }),
      ]);
    });
  }
}
;
 
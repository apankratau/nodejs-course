'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserGroup', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      GroupId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Group',
          key: 'id',
        },
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('UserGroup');
  },
};

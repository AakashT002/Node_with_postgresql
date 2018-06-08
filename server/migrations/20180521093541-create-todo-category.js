'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
     queryInterface.createTable('TodoCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sold: {
        type: Sequelize.STRING,
        defaultValue: 'NO'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      todoCatId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Todos',
          key: 'id',
          as: 'todoCatId',
        },
      },
    }),

  down: (queryInterface, Sequelize) => 
    queryInterface.dropTable('TodoCategories'),
};
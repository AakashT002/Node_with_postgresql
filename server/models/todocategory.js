'use strict';
module.exports = (sequelize, DataTypes) => {
  var TodoCategory = sequelize.define('TodoCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sold: {
      type: DataTypes.STRING,
      defaultValue: 'No',
    }
  });

  TodoCategory.associate = (models) => {
    TodoCategory.belongsTo(models.Todo, {
      foreignKey: 'todoCatId',
      onDelete: 'CASCADE',
    });
  };

  return TodoCategory;
};
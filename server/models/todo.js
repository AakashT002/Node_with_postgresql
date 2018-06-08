'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Todo.associate = (models) => {
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems',
    });
  };

  // Todo.associate = (models) => {
  //   Todo.hasMany(models.TodoCategory, {
  //     foreignKey: 'todoCatId',
  //     as: 'todoCategories',
  //   });
  // };

  return Todo;
};
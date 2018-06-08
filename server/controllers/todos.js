const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const TodoCategory = require('../models').TodoCategory;
const sequelize = require('../models/index').sequelize;

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  listUsingRawQuery(req, res) {
    const query = 'SELECT "t1"."title" FROM Todos t1';

    sequelize.query(query, {
      model: Todo
    })
      .then(todos => {
        console.log("todos "+todos)
        res.status(200).send(todos)
      })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
        order: [[
          'id', 'ASC'
        ]],
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },

  listTodoWithCategory(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoCategory,
          as: 'todoCategories',
        }],
        // order: [[
        //   'id', 'ASC'
        // ]],
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(todo);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
          })
          .then(() => res.status(200).send(todo))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(200).send({ message: 'todo deleted successfylly' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
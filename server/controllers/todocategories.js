const TodoCategory = require('../models').TodoCategory;

module.exports = {
  create(req, res) {
    return TodoCategory
      .create({
        name: req.body.name,
        todoCatId: req.params.todoCatId,
        sold: req.body.sold,
      })
      .then(todoCategory => res.status(201).send(todoCategory))
      .catch(error => res.status(400).send(error));
  },
};
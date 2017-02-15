const ToDo = require('../models/todo');

module.exports = {
  create: (req, res) => {
    let newTodo = new newTodo({
      description: req.body.description,
      category: req.body.category
    });

    newTodo.save((err, todo) => {
     if (err) {
        res.status(501).json({
          error: err
        });
      } else {
        res.json({
          todo
        });
      }
    })
  },
  update: () => {},
  listAll: (req, res) => {
    ToDo.find({}, (err, todos) => {
      if (err) {
        res.status(501).json({
          error: err
        });
      } else {
        res.json({
          todos
        });
      }
    })
  }
}
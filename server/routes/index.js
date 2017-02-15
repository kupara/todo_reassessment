const todoController = require('../controllers/todoController');

module.exports = (app) => {
  app.get('/todos', todoController.listAll);
  app.post('/todos', todoController.create);
}
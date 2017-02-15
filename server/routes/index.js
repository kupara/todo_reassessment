const todoController = require('../controllers/todoController');
const path = require('path');

module.exports = (app) => {
  app.get('/todos', todoController.listAll);
  app.post('/todos', todoController.create);
   app.put('/todos', todoController.update);
  app.get('*', (req, res) => {
    res.sendFile('index.html', {
      root: path.resolve(__dirname,  '../../dist')
    })
  });
}
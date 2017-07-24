const todoController = require('../controllers/todoController');
const path = require('path');

module.exports = (app) => {
  app.route('/todos')
    .post(todoController.create)
    .get(todoController.listAll)
  
  app.route('/todos/:id')
   .put(todoController.update);
  
  app.get('*', (req, res) => {
    res.sendFile('index.html', {
      root: path.resolve(__dirname,  '../../dist')
    })
  });
}
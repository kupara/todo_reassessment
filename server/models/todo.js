const mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  category: {
    type: String,
    enum: ['WORK', 'PERSONAL']
  } 
});

module.exports = mongoose.model('todoModel', todoSchema);
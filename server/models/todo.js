const mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false 
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
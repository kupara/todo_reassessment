import Dispatcher from '../dispatcher/dispatcher';
import { EventEmitter } from 'events';

let todos = [];

class TodoStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(event) {
    if (event) {
      this.emit(event);
    } else {
      this.emit('change');
    }
  }

  addChangeListener(event, cb) {
    if (event) {
      this.on(event, cb);
    } else {
      this.on('change', cb)
    }
  }

  removeChangeListener(event, cb) {
    if (event) {
      this.removeListener(event, cb);
    } else {
      this.removeListener('change', cb)
    }
  }

  setTodos(data) {
    todos = data;
    this.emitChange('change');
  }

  updateTodo(data) {
    todos = todos.filter(todo => todo._id !== data._id).concat([data])
    this.emitChange('change');
  }

  getTodos() {
    return todos;
  }

  deleteTodo(data) {
    todos = todos.filter(todo => todo._id !== data._id);
    this.emitChange('change');
  }

  setNewTodo(data) {
    todos.push(data);
    this.emitChange('change');
  }
}

let todoStore = new TodoStore();

todoStore.dispatchToken = Dispatcher.register(action => {
  switch (action.actionType) {
    case 'FETCH_TODOS':
      todoStore.setTodos(action.data);
      break;

    case 'TODO_CREATED':
      todoStore.setNewTodo(action.data);
      break;

    case 'TODO_UPDATED':
      todoStore.updateTodo(action.data);
      break;
  }
});

export default todoStore;
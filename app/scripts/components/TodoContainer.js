import React from 'react';
import ListTodos from './TodoList';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { fetchTodos, createTodo, updateTodo } from '../actions/todoActions';
import Store from '../store/store';

class TodoContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      todos: [],
      newTodo: {
        text: '',
        category: '',
        completed: false
      }
    }
    this.fetchTodos = this.fetchTodos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    this.handleTaskCheck = this.handleTaskCheck.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener('change', this.fetchTodos);
  }

  componentDidMount() {
    fetchTodos();
  }

  fetchTodos() {
    let data = Store.getTodos();
    if (data) {
      this.setState({
        todos: data
      });
    }
  }

  handleChange(event) {
    this.setState({
      newTodo: {
        text: event.target.value
      }
    });
  }

  handleCategoryChange(event, index, value) {
    this.setState({
      newTodo: {
        category: value
      }
    });
  }

  handleCreation() {
    let inputField = document.querySelector('.todo-input input');
    inputField.value = '';
    createTodo({
      text: this.state.newTodo.text,
      category: this.state.newTodo.category
    }); 
  }

  handleTaskCheck(id) {
    return (event, checked) => {
      this.setState({
        newTodo: {
          completed: checked
        }
      }, () => updateTodo(this.state.newTodo, id));
    }
  }

  componentWillUnmount() {
    Store.removeChangeListener('change', this.getTodos);
  }

  render() {
    return (
      <div className="container">
        <TextField
          hintText="Create Todo"
          className="todo-input"
          onChange={this.handleChange}/>
        <SelectField
          floatingLabelText="Category"
          value={this.state.newTodo.category}
          onChange={this.handleCategoryChange}
        >
          <MenuItem value={'WORK'} primaryText="Work" />
          <MenuItem value={'PERSONAL'} primaryText="Persona" />
        </SelectField>
        <IconButton onTouchTap={this.handleCreation}>
          <FontIcon className="material-icons">
            <i className="material-icons md-24">add</i>
          </FontIcon>
        </IconButton>
        <div className="incomplete">
          <ListTodos handleCheck={this.handleTaskCheck} todos={this.state.todos.filter(todo => !todo.completed)}/>
        </div>
        <div className="complete">
          <ListTodos handleCheck={this.handleTaskCheck} todos={this.state.todos.filter(todo => todo.completed)}/>
        </div>
      </div>
    );
  }
}

export default TodoContainer;
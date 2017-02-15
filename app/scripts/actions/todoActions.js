import axios from 'axios';
import Dispatcher from '../dispatcher/dispatcher';

const url = '/todos'
export function fetchTodos() {
  axios.get(url)
    .then((response) => {
      Dispatcher.dispatch({
        actionType: 'FETCH_TODOS',
        data: response.data.data
      });
    });
}

export function updateTodo(todo, id) {
  axios
    .put(`${url}/${id}`, todo)
    .then((err, response) => {
      Dispatcher.dispatch({
        actionType: 'TODO_UPDATED',
        data: response.data.data
      });
    });
}

export function createTodo(todo) {
  axios.post(url, todo)
    .then((response) => {
      Dispatcher.dispatch({
        actionType: 'FETCH_TODOS',
        data: response.data.data
      });
    });
}
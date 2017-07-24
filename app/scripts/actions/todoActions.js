import axios from 'axios';
import Dispatcher from '../dispatcher/dispatcher';

const url = '/todos';

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
  axios.put(`${url}/${id}`, todo)
    .then((response) => {
      Dispatcher.dispatch({
        actionType: 'TODO_UPDATED',
        data: response.data.data
      });
    });
}

export function createTodo(todo) {
  axios({
    url,
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: todo,
  }).then((response) => {
      console.log('Posted')
      Dispatcher.dispatch({
        actionType: 'CREATE_TODOS',
        data: response.data.data
      });
    }).catch(err => {
      console.log('Error', err);
    });
}
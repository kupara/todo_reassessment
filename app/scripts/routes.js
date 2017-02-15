import React from 'react';
import { IndexRoute, Route } from 'react-router';

//routes
import App from './components/App';
import TodoContainer from './components/TodoContainer';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={TodoContainer} />
  </Route> 
)
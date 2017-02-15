import React, {PropTypes} from 'react';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const TodoList = (props) => {
  let renderItems = (data) => {
    return (
        <ListItem key={data._id}>
          <Checkbox style={{display: 'inline-block', width: '95%'}} checked={data.completed} label={data.text} onCheck={props.handleCheck(data._id)}/>
        </ListItem>
    );
  }

  return (
    <List>
      {
        (props.todos.length) 
        ? props.todos.map(renderItems) 
        : <div className="no-todos">No todos to display</div>
      }
    </List>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  handleCheck: PropTypes.func,
}

export default TodoList;

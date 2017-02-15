import React, { PropTypes } from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const App = (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div>
      <AppBar title="My AppBar" />
      { props.children }
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.node
}

export default App;
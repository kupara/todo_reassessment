import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import tapPlugin from 'react-tap-event-plugin';
import routes from './routes';
// make touchTap work for material-ui
tapPlugin();

const rootEl = document.getElementById('app');

render(<Router routes={routes} history={browserHistory}/>, rootEl);

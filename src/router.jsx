/**
 * App router
 * @author JoshOY
 * Created on 2017-03-14
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const midware = routerMiddleware(history);

const AppRouter = () => (
  <ConnectedRouter history={history}>
    <Router>
      <div className="app-root">
        <h1>App root</h1>
      </div>
    </Router>
  </ConnectedRouter>
);

export const middleware = midware;

export default AppRouter;

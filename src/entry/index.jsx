import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

/**
 * vendor styles
 */
import 'highlight.js/styles/vs.css';

/**
 * common styles
 */
import '../common/styles/index.sass';

import AppRouter from '../router';
import store from '../store';
import {
  Login,
  NotFound,
  Assignments,
  Auth,
} from '../modules';

/**
 * Debug only
 */
if (window.APP_DEV_ENV) {
  window.UiStore = store;
}

const main = async () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter>
        <Switch>
          <Route path="/assignments" exact component={Assignments} />
          <Route path="/login" exact component={Login} />
          <Route path="/auth" component={Auth} />
          <Redirect exact from="/" to="/auth" />
          <Route component={NotFound} />
        </Switch>
      </AppRouter>
    </Provider>,
    document.getElementById('app-root'),
  );
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});

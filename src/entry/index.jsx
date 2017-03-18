import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

/**
 * vendor styles
 */
import 'highlight.js/styles/vs.css';

/**
 * common styles
 */
import '../common/styles/index.sass';

import AppRouter from '../router.jsx';
import store from '../store';
import { Login, NotFound, Assignments } from '../modules';

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

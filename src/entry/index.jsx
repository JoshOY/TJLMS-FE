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
  Admin,
} from '../modules';

const Validation = Auth.Validation;

const AuthRoute = ({ component: Component, allowedRoles, ...rest }) => (
  <Route {...rest}>
    <Validation allowedRoles={allowedRoles}>
      <Component />
    </Validation>
  </Route>
);

AuthRoute.propTypes = {
  component: React.PropTypes.func.isRequired,
  allowedRoles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

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
          <AuthRoute
            path="/assignments"
            exact
            allowedRoles={['admin', 'ta', 'student']}
            component={Assignments}
          />
          <Route path="/login" exact component={Login} />
          <AuthRoute
            path="/admin"
            exact
            allowedRoles={['admin', 'ta']}
            component={Admin}
          />
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

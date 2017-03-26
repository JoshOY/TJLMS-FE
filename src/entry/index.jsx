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

const AuthRoute = ({ component: Component, computedMatch, allowedRoles, children, ...rest }) => (
  <Route computedMatch={computedMatch} {...rest}>
    <Validation match={computedMatch} allowedRoles={allowedRoles}>
      <Component match={computedMatch}>
        {children}
      </Component>
    </Validation>
  </Route>
);

AuthRoute.propTypes = {
  component: React.PropTypes.func.isRequired,
  allowedRoles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  children: React.PropTypes.node,
  computedMatch: React.PropTypes.any,
};

AuthRoute.defaultProps = {
  children: [],
  computedMatch: undefined,
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
          <Route
            path="/login"
            exact
            component={Login}
          />
          <AuthRoute
            path="/assignments"
            exact
            allowedRoles={['admin', 'ta', 'student']}
            component={Assignments}
          />
          <AuthRoute
            path="/admin"
            allowedRoles={['admin', 'ta']}
            component={Admin}
          >
            <Route
              path="/admin/:assignmentId"
              exact
              component={() => <div>Child</div>}
            />
          </AuthRoute>
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

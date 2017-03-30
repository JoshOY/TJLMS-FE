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

const { AssignmentManagement } = Admin;

const Validation = Auth.Validation;

const AuthRoute = ({
    component: Component,
    computedMatch,
    location,
    path,
    allowedRoles,
    children,
    ...rest
  }) => (
    <Route computedMatch={computedMatch} {...rest}>
      <Validation match={computedMatch} allowedRoles={allowedRoles} location={location} path={path}>
        <Component match={computedMatch} location={location} path={path}>
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
  location: React.PropTypes.any,
  path: React.PropTypes.any,
};

AuthRoute.defaultProps = {
  children: [],
  computedMatch: undefined,
  location: undefined,
  path: undefined,
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
          {/* Assignments */}
          <AuthRoute
            path="/assignments"
            exact
            allowedRoles={['admin', 'ta', 'student']}
            component={Assignments}
          />
          <AuthRoute
            path="/assignments/:assignmentId"
            exact
            allowedRoles={['admin', 'ta', 'student']}
            component={Assignments}
          />
          <AuthRoute
            path="/assignments/:assignmentId/:problemId"
            exact
            allowedRoles={['admin', 'ta', 'student']}
            component={Assignments}
          />
          {/* Admin */}
          <AuthRoute
            path="/admin"
            allowedRoles={['admin', 'ta']}
            component={Admin}
          >
            <Switch>
              <Route
                path="/admin/"
                exact
                component={() => null}
              />
              <Route
                path="/admin/:assignmentId"
                component={AssignmentManagement}
              />
              <Route
                component={() => <Redirect to="/404" />}
              />
            </Switch>
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

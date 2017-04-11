import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import loadLogin from 'bundle-loader?lazy!../modules/login';
import loadAssignment from 'bundle-loader?lazy!../modules/assignments';

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
import Bundle from '../common/components/bundle';

import {
  NotFound,
  // Assignments,
  Auth,
  Admin,
  SubmissionHistory,
} from '../modules';

/* Code splitting */
// const loadLogin = () => import('../modules/login');
// const loadAssignment = () => import('../modules/assignments');

const Login = routerProps => (
  <Bundle load={loadLogin} {...routerProps}>
    {(LoginView, props) => (
      LoginView ? <LoginView {...props} /> : <div />
    )}
  </Bundle>
);

const Assignments = routerProps => (
  <Bundle load={loadAssignment} {...routerProps}>
    {(AssignmentView, props) => (
      AssignmentView ? <AssignmentView {...props} /> : <div />
    )}
  </Bundle>
);

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

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
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
              path="/assignments/change-pwd"
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
            <AuthRoute
              path="/submission-history/:assignmentId/:problemId"
              exact
              allowedRoles={['admin', 'ta', 'student']}
              component={SubmissionHistory}
            />
            <AuthRoute
              path="/submission-history/:assignmentId/:problemId/:historyId"
              exact
              allowedRoles={['admin', 'ta', 'student']}
              component={SubmissionHistory}
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
      </Provider>
    );
  }

}

const main = async () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app-root'),
  );
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});

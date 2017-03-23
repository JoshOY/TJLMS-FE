import LoginModule from './login';
import PageNotFoundModule from './not-found';
import AssignmentsModule from './assignments';
import AuthModule from './auth';

export const Login = LoginModule;
export const NotFound = PageNotFoundModule;
export const Assignments = AssignmentsModule;
export const Auth = AuthModule;

export default {
  Login,
  NotFound,
  Assignments,
  Auth,
};

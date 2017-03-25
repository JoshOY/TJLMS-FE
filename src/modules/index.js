import LoginModule from './login';
import PageNotFoundModule from './not-found';
import AssignmentsModule from './assignments';
import AuthModule from './auth';
import AdminModule from './admin';

export const Login = LoginModule;
export const NotFound = PageNotFoundModule;
export const Assignments = AssignmentsModule;
export const Auth = AuthModule;
export const Admin = AdminModule;

export default {
  Login,
  NotFound,
  Assignments,
  Auth,
  Admin,
};

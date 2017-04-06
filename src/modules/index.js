import LoginModule from './login';
import PageNotFoundModule from './not-found';
import AssignmentsModule from './assignments';
import AuthModule from './auth';
import AdminModule from './admin';
import SubmissionHistoryModule from './submission-history';

export const Login = LoginModule;
export const NotFound = PageNotFoundModule;
export const Assignments = AssignmentsModule;
export const Auth = AuthModule;
export const Admin = AdminModule;
export const SubmissionHistory = SubmissionHistoryModule;

export default {
  Login,
  NotFound,
  Assignments,
  Auth,
  Admin,
  SubmissionHistory,
};

/**
 * Redux root reducer
 * @author JoshOY
 * Created on 2017-03-14
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/**
 * Import app reducers
 */
import authReducer from './auth/reducer';
import loginReducer from './login/reducer';
import adminReducer from './admin/reducer';
import assignmentsReducer from './assignments/reducer';
import submissionHistoryReducer from './submission-history/reducer';

/**
 * Combine reducers
 */
const RootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  login: loginReducer,
  admin: adminReducer,
  assignments: assignmentsReducer,
  submissionHistory: submissionHistoryReducer,
});

export default RootReducer;

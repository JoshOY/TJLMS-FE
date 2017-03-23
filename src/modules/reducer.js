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

/**
 * Combine reducers
 */
const RootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
});

export default RootReducer;

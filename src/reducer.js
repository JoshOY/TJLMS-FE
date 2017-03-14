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

/**
 * Combine reducers
 */
const RootReducer = combineReducers({
  routing: routerReducer,
});

export default RootReducer;

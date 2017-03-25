/**
 * Auth related reducer
 * @author JoshOY
 * Created on 2017-03-25
 */

import _ from 'lodash';

import { AT } from '../actions';

const initState = {
  asyncActionIdsInObserve: [],
  isLogin: false,
  loginCode: 0,
  userStatus: null,
};

const handleDispatches = {

  [AT.USER_STATUS.success]: (state, action) => {
    if (action.payload.code === 200) {
      return _.assign({}, state, {
        isLogin: true,
        loginCode: 200,
        userStatus: action.payload.data,
      });
    }
    // else
    return _.assign({}, state, {
      isLogin: false,
      loginCode: action.payload.code,
      userStatus: null,
    });
  },

};

/**
 * Export reducer function
 * @param state: last state
 * @param action: dispatched action
 * @return {*}
 */
function reducerFn(state = initState, action) {
  if (
    (typeof action.actionId !== 'undefined') &&
    (_.includes(state.asyncActionIdsInObserve, action.actionId) === false)
  ) {
    // Overdue async action will be ignored
    return state;
  }
  const handler = handleDispatches[action.type || ''] ||
    (stateParam => stateParam);
  return handler(state, action);
}

export default reducerFn;


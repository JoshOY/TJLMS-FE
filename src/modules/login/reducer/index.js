/**
 * Login reducer
 * @author JoshOY
 * Created on 2017-03-25
 */

import _ from 'lodash';

import { AT } from '../actions';

const initState = {
  asyncActionIdsInObserve: [],
  latestLoginActionId: null,
};

const handleDispatches = {

  [AT.LOGIN.pending]: (state, action) => _.assign({}, state, {
    latestLoginActionId: action.payload,
  }),

  [AT.LOGIN.success]: (state, action) => {
    if (action.payload.actionId !== state.latestLoginActionId) {
      return state;
    }
    // if latest request
    return _.assign({}, state, {
      latestLoginActionId: null,
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


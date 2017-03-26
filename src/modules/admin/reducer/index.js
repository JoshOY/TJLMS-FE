/**
 * Auth related reducer
 * @author JoshOY
 * Created on 2017-03-25
 */

import _ from 'lodash';

import { AT } from '../actions';

const initState = {
  asyncActionIdsInObserve: [],
  assignmentList: [],
  assignmentListIsLoading: true,
};

const handleDispatches = {
  [AT.FETCH_ASSIGNMENT_LIST.pending]: state => _.assign({}, state, {
    assignmentListIsLoading: true,
  }),
  [AT.FETCH_ASSIGNMENT_LIST.success]: (state, action) => {
    const resp = action.payload;
    return _.assign({}, state, {
      assignmentListIsLoading: false,
      assignmentList: resp.data,
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


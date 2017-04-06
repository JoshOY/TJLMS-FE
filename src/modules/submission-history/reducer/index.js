/**
 * Created by joshoy on 2017/3/29.
 */

import _ from 'lodash';
// import Assignment from 'src/datamodels/assignment';
// import Problem from 'src/datamodels/problem';
import { AT } from '../actions';

const initState = {
  currentProblemHistoryList: [],
  currentHistoryDetails: null,
};

const handleDispatches = {

  [AT.FETCH_PROBLEM_HISTORY_LIST.success]: (state, action) => {
    const data = action.payload;
    return _.assign({}, state, {
      currentProblemHistoryList: data,
    });
  },

  [AT.FETCH_PROBLEM_HISTORY_DETAIL.success]: (state, action) => {
    const data = action.payload;
    return _.assign({}, state, {
      currentHistoryDetails: data,
    });
  },

  [AT.CLEAR_PROBLEM_HISTORY]: state => _.assign({}, state, {
    currentProblemHistoryList: [],
    currentHistoryDetails: null,
  }),

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


/**
 * Created by joshoy on 2017/3/29.
 */

import _ from 'lodash';
import Assignment from 'src/datamodels/assignment';
import { AT } from '../actions';

const initState = {
  asyncActionIdsInObserve: [],
  assignmentListIsLoading: true,
  assignmentsList: [],
  currentAssignment: null,
};

const handleDispatches = {
  /* FETCH_ASSIGNMENTS */
  [AT.FETCH_ASSIGNMENTS.pending]: state => _.assign({}, state, {
    assignmentListIsLoading: true,
  }),
  [AT.FETCH_ASSIGNMENTS.success]: (state, action) => {
    const resp = action.payload;
    return _.assign({}, state, {
      assignmentListIsLoading: false,
      assignmentList: _.map(resp.data, obj => new Assignment(obj)),
    });
  },
  [AT.FETCH_ASSIGNMENT_DETAIL.success]: (state, action) => {
    const currentAssignmentObj = action.payload.data;
    return _.assign({}, state, {
      currentAssignment: new Assignment(currentAssignmentObj),
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


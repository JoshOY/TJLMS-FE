/**
 * Created by joshoy on 2017/3/29.
 */

const wrapByNamespace = actionName => `assignments/${actionName}`;

const createAsyncActions = actionName => ({
  pending: wrapByNamespace(`${actionName}_PENDING`),
  success: wrapByNamespace(`${actionName}_SUCCESS`),
  failed: wrapByNamespace(`${actionName}_FAILED`),
});

export default {
  FETCH_ASSIGNMENTS: createAsyncActions('FETCH_ASSIGNMENTS'),
  FETCH_ASSIGNMENT_DETAIL: createAsyncActions('FETCH_ASSIGNMENT_DETAIL'),
  SET_CURRENT_PROBLEM: wrapByNamespace('SET_CURRENT_PROBLEM'),
  CHANGE_ANSWER_VALUE: wrapByNamespace('CHANGE_ANSWER_VALUE'),
  SUBMIT_ANSWERS: createAsyncActions('SUBMIT_ANSWERS'),
};

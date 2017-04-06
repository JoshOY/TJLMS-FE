/**
 * Created by joshoy on 2017/3/29.
 */

const wrapByNamespace = actionName => `submissionHistory/${actionName}`;

const createAsyncActions = actionName => ({
  pending: wrapByNamespace(`${actionName}_PENDING`),
  success: wrapByNamespace(`${actionName}_SUCCESS`),
  failed: wrapByNamespace(`${actionName}_FAILED`),
});

export default {
  FETCH_PROBLEM_HISTORY_LIST: createAsyncActions('FETCH_PROBLEM_HISTORY_LIST'),
  FETCH_PROBLEM_HISTORY_DETAIL: createAsyncActions('FETCH_PROBLEM_HISTORY_DETAIL'),
  CLEAR_PROBLEM_HISTORY: wrapByNamespace('CLEAR_PROBLEM_HISTORY'),
};

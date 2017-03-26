/**
 * Created by joshoy on 2017/3/26.
 */

const wrapByNamespace = actionName => `admin/${actionName}`;

const createAsyncActions = actionName => ({
  pending: wrapByNamespace(`${actionName}_PENDING`),
  success: wrapByNamespace(`${actionName}_SUCCESS`),
  failed: wrapByNamespace(`${actionName}_FAILED`),
});

export default {
  FETCH_ASSIGNMENT_LIST: createAsyncActions('FETCH_ASSIGNMENT_LIST'),
  CREATE_ASSIGNMENT: createAsyncActions('CREATE_ASSIGNMENT'),
};

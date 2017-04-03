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
  MANAGE_ASSIGNMENT: createAsyncActions('MANAGE_ASSIGNMENT'),
  CREATE_PROBLEM: createAsyncActions('CREATE_PROBLEM'),
  INIT_PROBLEM_CREATOR: wrapByNamespace('INIT_PROBLEM_CREATOR'),
  UPDATE_PROBLEM_CREATOR: wrapByNamespace('UPDATE_PROBLEM_CREATOR'),
  LOAD_EDITING_PROBLEM: wrapByNamespace('LOAD_EDITING_PROBLEM'),
  UPDATE_EDITING_PROBLEM: wrapByNamespace('UPDATE_EDITING_PROBLEM'),
  UPDATE_EDITING_ASSIGNMENT: wrapByNamespace('UPDATE_EDITING_ASSIGNMENT'),
  SAVE_EDITING_PROBLEM_CHANGES: createAsyncActions('SAVE_EDITING_PROBLEM_CHANGES'),
  SAVE_EDITING_ASSIGNMENT_CHANGES: createAsyncActions('SAVE_EDITING_ASSIGNMENT_CHANGES'),
};

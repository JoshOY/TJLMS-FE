/**
 * Created by joshoy on 2017/3/24.
 */

const wrapByNamespace = actionName => `auth/${actionName}`;

const createAsyncActions = actionName => ({
  pending: wrapByNamespace(`${actionName}_PENDING`),
  success: wrapByNamespace(`${actionName}_SUCCESS`),
  failed: wrapByNamespace(`${actionName}_FAILED`),
});

export default {
  USER_STATUS: createAsyncActions('USER_STATUS'),
};

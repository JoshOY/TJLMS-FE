/**
 * Created by joshoy on 2017/3/25.
 */

const wrapByNamespace = actionName => `login/${actionName}`;

const createAsyncActions = actionName => ({
  pending: wrapByNamespace(`${actionName}_PENDING`),
  success: wrapByNamespace(`${actionName}_SUCCESS`),
  failed: wrapByNamespace(`${actionName}_FAILED`),
});

export default {
  LOGIN: createAsyncActions('LOGIN'),
};

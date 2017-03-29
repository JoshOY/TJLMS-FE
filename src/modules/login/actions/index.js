/**
 * Created by joshoy on 2017/3/25.
 */

import { message } from 'antd';
import ApiUtil from 'src/utils/api-util';

import ActionTypes from './types';
import AuthActions from '../../auth/actions';

export const AT = ActionTypes;

export default class Actions {

  /**
   * Fetch user status async from server
   * @return {Promise.<void>}
   */
  static login({ username, password }) {
    return (dispatch, getState) => {
      const asyncFn = async () => {
        const actionId = (new Date()).getTime().toString();
        // on start
        dispatch({
          type: AT.LOGIN.pending,
          payload: actionId,
        });
        const respObj = await ApiUtil.tokenPost(
          '/api/user/login',
          {
            username,
            password,
          },
        );
        // console.log('respObj =', respObj);
        if (respObj.code !== 200) {
          return message.error(respObj.msg);
        }
        // else if success
        const reducerState = getState().login;
        if (reducerState.latestLoginActionId !== actionId) {
          // console.log('reducerState.latestLoginActionId =', reducerState.latestLoginActionId);
          return null;
        }
        dispatch({
          type: AT.LOGIN.success,
          payload: {
            username,
            actionId,
          },
        });
        const dismissMsg = message.loading('Fetching user status...', 0);
        dispatch(await AuthActions.fetchUserStatusAsync(dispatch)());
        dismissMsg();
        return null;
      };
      asyncFn();
    };
  }
}

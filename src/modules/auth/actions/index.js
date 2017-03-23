/**
 * Created by joshoy on 2017/3/24.
 */

import ApiUtil from 'src/utils/api-util';
import ActionTypes from './types';

export const AT = ActionTypes;

export default class Actions {

  /**
   * Fetch user status async from server
   * @return {Promise.<void>}
   */
  static fetchUserStatusAsync = dispatch => async () => {
    dispatch({
      type: AT.USER_STATUS.pending,
    });
    try {
      const resp = await ApiUtil.tokenGet('/api/user/status');
      return {
        type: AT.USER_STATUS.success,
        payload: resp,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return {
        type: AT.USER_STATUS.failed,
      };
    }
  };

}

/**
 * Created by joshoy on 2017/3/26.
 */

import { message } from 'antd';
import ApiUtil from 'src/utils/api-util';
import ActionTypes from './types';

export const AT = ActionTypes;

export default class Actions {

  static fetchAssignmentListAsync = () => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.FETCH_ASSIGNMENT_LIST.pending,
      });
      const respObj = await ApiUtil.tokenGet('/api/assignment');
      dispatch({
        type: AT.FETCH_ASSIGNMENT_LIST.success,
        payload: respObj,
      });
      return Promise.resolve();
    };
    return asyncFn();
  };

  static createAssignmentAsync = (name, beginAt, endAt, visible) => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.CREATE_ASSIGNMENT.pending,
      });
      const respObj = await ApiUtil.tokenPost(
        '/api/manage/create/assignment',
        {
          name,
          begin_at: `${beginAt.format('YYYY-MM-DD')}T00:00:00`,
          end_at: `${endAt.format('YYYY-MM-DD')}T23:59:59`,
          visible,
        },
      );
      if (respObj.code !== 200) {
        message.error(respObj.msg);
        return respObj;
      }
      message.success('Assignment created.');
      dispatch({
        type: AT.CREATE_ASSIGNMENT.success,
        payload: respObj,
      });
      return Promise.resolve();
    };
    return asyncFn();
  };

}

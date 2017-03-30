/**
 * Created by joshoy on 2017/3/29.
 */

import { message } from 'antd';
// import _ from 'lodash';
import ApiUtil from 'src/utils/api-util';
import ActionTypes from './types';

export const AT = ActionTypes;

export default class Actions {

  static fetchAssignmentListAsync = () => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.FETCH_ASSIGNMENTS.pending,
      });
      const respObj = await ApiUtil.tokenGet('/api/assignment');
      dispatch({
        type: AT.FETCH_ASSIGNMENTS.success,
        payload: respObj,
      });
      return Promise.resolve();
    };
    return asyncFn();
  };

  static fetchAssignmentDetailAsync = assignmentId => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.FETCH_ASSIGNMENT_DETAIL.pending,
      });
      const respObj = await ApiUtil.tokenGet(`/api/assignment/${assignmentId}`);
      if (respObj.code !== 200) {
        message.error(respObj.msg);
        return Promise.reject();
      }
      dispatch({
        type: AT.FETCH_ASSIGNMENT_DETAIL.success,
        payload: respObj,
      });
      return Promise.resolve();
    };
    return asyncFn();
  };

}

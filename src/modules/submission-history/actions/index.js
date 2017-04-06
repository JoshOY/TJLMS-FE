/**
 * Created by joshoy on 2017/3/29.
 */

import { message } from 'antd';
import ApiUtil from 'src/utils/api-util';
import ActionTypes from './types';

export const AT = ActionTypes;

export default class Actions {

  static fetchProblemHistoryList = (assignmentId, problemId) => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.FETCH_PROBLEM_HISTORY_LIST.pending,
      });
      try {
        const respObj = await ApiUtil.tokenGet(
          `/api/assignment/history/list/${assignmentId}/${problemId}`,
        );
        if (respObj.code !== 200) {
          message.error(respObj.reason);
          throw new Error(respObj.reason);
        }
        // if success
        dispatch({
          type: AT.FETCH_PROBLEM_HISTORY_LIST.success,
          payload: respObj.data,
        });
        return respObj;
      } catch (err) {
        throw new Error(err);
      }
    };
    return asyncFn();
  };

  static fetchProblemHistoryDetail = historyId => (dispatch) => {
    const asyncFn = async () => {
      const dismissMsg = message.loading('Retrieving history info...');
      dispatch({
        type: AT.FETCH_PROBLEM_HISTORY_DETAIL.pending,
      });
      try {
        const respObj = await ApiUtil.tokenGet(
          `/api/assignment/history/detail/${historyId}`,
        );
        dismissMsg();
        if (respObj.code !== 200) {
          message.error(respObj.reason);
          throw new Error(respObj.reason);
        }
        // if success
        dispatch({
          type: AT.FETCH_PROBLEM_HISTORY_DETAIL.success,
          payload: respObj.data,
        });
        return respObj;
      } catch (err) {
        throw new Error(err);
      }
    };
    return asyncFn();
  };

  static clearFetchProblemHistory = () => ({
    type: AT.CLEAR_PROBLEM_HISTORY,
  });

}

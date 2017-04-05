/**
 * Created by joshoy on 2017/3/29.
 */

import { message } from 'antd';
import _ from 'lodash';
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

  static fetchAssignmentDetailAsync = (assignmentId, problemId) => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.FETCH_ASSIGNMENT_DETAIL.pending,
      });
      const respObj = await ApiUtil.tokenGet(`/api/assignment/${assignmentId}`);
      if (respObj.code !== 200) {
        message.error(respObj.reason);
        return Promise.reject();
      }
      dispatch({
        type: AT.FETCH_ASSIGNMENT_DETAIL.success,
        payload: respObj,
      });
      if (problemId) {
        dispatch(Actions.setCurrentProblem(
          _.find(
            respObj.data.problems,
            q => (q._id === problemId),
          ),
        ));
      }
      return respObj;
    };
    return asyncFn();
  };

  static fetchProblemDetailAsync = (assignmentId, problemId) => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.FETCH_PROBLEM_DETAIL.pending,
      });
      try {
        const respObj = await ApiUtil.tokenGet(`/api/assignment/${assignmentId}/${problemId}`);
        console.log(respObj);
        if (respObj.code !== 200) {
          throw new Error(respObj.reason);
        }
        // if success
        const problemObj = respObj.data;
        dispatch(Actions.setCurrentProblem(problemObj));
        return respObj;
      } catch (err) {
        if (err.reason) {
          message.error(err.reason);
        } else {
          message.error('Fetch problem data failed.');
        }
        throw new Error(err);
      }
    };
    return asyncFn();
  };

  static setCurrentProblem = problem => (dispatch) => {
    dispatch({
      type: AT.SET_CURRENT_PROBLEM,
      payload: problem,
    });
    return Promise.resolve();
  };

  static changeAnswerValue = (answerIdx, newValue) => (dispatch) => {
    dispatch({
      type: AT.CHANGE_ANSWER_VALUE,
      payload: {
        answerIdx,
        newValue,
      },
    });
    return Promise.resolve();
  };

  static submitAnswersAsync = () => (dispatch, getState) => {
    const state = getState().assignments;
    const asyncFn = async () => {
      dispatch({
        type: AT.SUBMIT_ANSWERS.pending,
      });
      try {
        const respObj = await ApiUtil.tokenPost(
          `/api/assignment/${state.currentAssignment._id}/${state.currentProblem._id}`,
          {
            answers: state.currentAnswers,
          },
        );
        if (respObj.code === 200) {
          // console.log(respObj);
          message.success('Answers saved.');
          dispatch({
            type: AT.SUBMIT_ANSWERS.success,
            payload: respObj,
          });
          return 0;
        }
        message.error(respObj.reason);
        dispatch({
          type: AT.SUBMIT_ANSWERS.failed,
          payload: respObj,
        });
        return new Error(respObj.reason);
      } catch (err) {
        message.error('Failed to connect to server');
        throw new Error(err);
      }
    };
    return asyncFn();
  };

  static changePwdAsync = newPwd => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.CHANGE_PWD.pending,
      });
      const respObj = await ApiUtil.tokenPost(
        '/api/manage/user/update',
        {
          password: newPwd,
        },
      );
      if (respObj.code === 200) {
        // console.log(respObj);
        message.success('Password changed.');
        dispatch({
          type: AT.CHANGE_PWD.success,
          payload: respObj,
        });
      } else {
        message.error(respObj.reason);
        dispatch({
          type: AT.CHANGE_PWD.failed,
          payload: respObj,
        });
      }
      return respObj;
    };
    return asyncFn();
  };
}

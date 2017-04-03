/**
 * Created by joshoy on 2017/3/26.
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
        type: AT.FETCH_ASSIGNMENT_LIST.pending,
      });
      const respObj = await ApiUtil.tokenGet('/api/manage/assignment');
      dispatch({
        type: AT.FETCH_ASSIGNMENT_LIST.success,
        payload: respObj,
      });
      return Promise.resolve();
    };
    return asyncFn();
  };

  /**
   * @param {string} name
   * @param {moment} beginAt
   * @param {moment} endAt
   * @param {bool} visible
   */
  static createAssignmentAsync = (name, beginAt, endAt, visible) => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.CREATE_ASSIGNMENT.pending,
      });
      const beginAtTimestamp = beginAt
        .hour(0)
        .minute(0)
        .second(0)
        .toDate()
        .getTime();
      const endAtTimestamp = endAt
        .hour(23)
        .minute(59)
        .second(59)
        .toDate()
        .getTime();
      const respObj = await ApiUtil.tokenPost(
        '/api/manage/create/assignment',
        {
          name,
          begin_at: beginAtTimestamp, // Python format
          end_at: endAtTimestamp, // Python format
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

  /**
   * @param {string} assignmentId
   */
  static fetchAssignmentDetailAsync = assignmentId => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.MANAGE_ASSIGNMENT.pending,
      });
      const respObj = await ApiUtil.tokenGet(`/api/manage/assignment/${assignmentId}`);
      if (respObj.code === 200) {
        dispatch({
          type: AT.MANAGE_ASSIGNMENT.success,
          payload: respObj.data,
        });
      } else {
        message.error(respObj.msg);
        dispatch({
          type: AT.MANAGE_ASSIGNMENT.failed,
          payload: respObj,
        });
      }
      // console.log(respObj);
      return Promise.resolve(respObj);
    };
    return asyncFn();
  };

  /**
   * @param {string} assignmentId
   * @param {number} order
   * @param {string} ptext
   * @param {Array<string>} qtexts
   */
  static createProblemAsync = (assignmentId, order, ptext, qtexts) => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.CREATE_ASSIGNMENT.pending,
      });
      const respObj = await ApiUtil.tokenPost(
        `/api/manage/create/problem/${assignmentId}`,
        {
          order,
          ptext,
          qtexts,
          visible: true,
        },
      );
      if (respObj.code === 200) {
        message.success('Create success!');
        dispatch({
          type: AT.CREATE_ASSIGNMENT.success,
          payload: respObj.data,
        });
      } else {
        message.error(respObj.msg);
        dispatch({
          type: AT.CREATE_ASSIGNMENT.failed,
          payload: respObj,
        });
      }
      // console.log(respObj);
      return Promise.resolve(respObj);
    };
    return asyncFn();
  };

  static resetNewProblemCreator = () => ({
    type: AT.INIT_PROBLEM_CREATOR,
  });

  static updateProblemCreatorState = (qNum, pText, qTexts) => ({
    type: AT.UPDATE_PROBLEM_CREATOR,
    payload: {
      qNum,
      pText,
      qTexts,
    },
  });

  static loadEditingProblem = problemId => (dispatch, getState) => {
    const managingAssignment = getState().admin.manageAssignmentObj;
    const editingProblem = _.find(managingAssignment.problems, p => (p._id === problemId));
    dispatch({
      type: AT.LOAD_EDITING_PROBLEM,
      payload: _.cloneDeep(editingProblem),
    });
    return Promise.resolve();
  };

  static updateEditingProblem = newEditingProblemState => ({
    type: AT.UPDATE_EDITING_PROBLEM,
    payload: newEditingProblemState,
  });

  static updateEditingAssignment = newEditingAssignmentState => ({
    type: AT.UPDATE_EDITING_ASSIGNMENT,
    payload: newEditingAssignmentState,
  });

  static saveChangesOfEditingProblemAsync = problem => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.SAVE_EDITING_PROBLEM_CHANGES.pending,
      });
      const respObj = await ApiUtil.tokenPost(
        `/api/manage/update/problem/${problem._id}/content`,
        problem.getUpdateObject(),
      );
      if (respObj.code !== 200) {
        message.error(respObj.msg);
        return Promise.reject();
      }
      // if success
      message.success('Save changes complete.');
      dispatch({
        type: AT.SAVE_EDITING_PROBLEM_CHANGES.success,
        payload: respObj,
      });
      return Promise.resolve();
    };
    return asyncFn();
  };

  static saveChangesOfEditingAssignmentAsync = assignment => (dispatch) => {
    const asyncFn = async () => {
      dispatch({
        type: AT.SAVE_EDITING_ASSIGNMENT_CHANGES.pending,
      });
      const respObj = await ApiUtil.tokenPost(
        `/api/manage/update/assignment/${assignment._id}`,
        assignment.getUpdateObject(),
      );
      if (respObj.code !== 200) {
        message.error(respObj.msg);
        return Promise.reject();
      }
      // if success
      message.success('Save changes complete.');
      dispatch({
        type: AT.SAVE_EDITING_ASSIGNMENT_CHANGES.success,
        payload: respObj,
      });
      return Promise.resolve();
    };
    return asyncFn();
  };
}

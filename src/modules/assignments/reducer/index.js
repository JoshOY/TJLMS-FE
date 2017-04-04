/**
 * Created by joshoy on 2017/3/29.
 */

import _ from 'lodash';
import Assignment from 'src/datamodels/assignment';
import Problem from 'src/datamodels/problem';
import { AT } from '../actions';

const initState = {
  asyncActionIdsInObserve: [],
  assignmentListIsLoading: true,
  assignmentsList: [],
  currentAssignment: null,
  currentProblem: null,
  currentAnswers: [],
  currentAnswersIsDirty: false,
};

const handleDispatches = {
  /* FETCH_ASSIGNMENTS */
  [AT.FETCH_ASSIGNMENTS.pending]: state => _.assign({}, state, {
    assignmentListIsLoading: true,
  }),
  [AT.FETCH_ASSIGNMENTS.success]: (state, action) => {
    const resp = action.payload;
    return _.assign({}, state, {
      assignmentListIsLoading: false,
      assignmentList: _.map(resp.data, obj => new Assignment(obj)),
    });
  },

  /* FETCH_ASSIGNMENT_DETAIL */
  [AT.FETCH_ASSIGNMENT_DETAIL.success]: (state, action) => {
    const currentAssignmentObj = action.payload.data;
    const allSubmissionAnswers = _.flow(
      x => _.map(x, submission => submission.answers),
      _.flattenDeep,
    )(currentAssignmentObj.submissions);
    return _.assign({}, state, {
      currentAssignment: new Assignment(currentAssignmentObj, allSubmissionAnswers),
    });
  },

  /* SET_CURRENT_PROBLEM */
  [AT.SET_CURRENT_PROBLEM]: (state, action) => {
    if (!action.payload) {
      return _.assign({}, state, {
        currentProblem: null,
        currentAnswers: [],
      });
    }
    let newCurrentAnswersState = [];
    if (!state.currentAssignment.submissions) {
      newCurrentAnswersState = _.map(action.payload.questions, q => ({
        question_id: q._id,
        text: '',
      }));
    } else {
      const allSubmissionAnswers = _.flow(
        x => _.map(x, submission => submission.answers),
        _.flattenDeep,
      )(state.currentAssignment.submissions);
      newCurrentAnswersState = _.map(
        action.payload.questions,
        (q) => {
          const ans = _.find(
            allSubmissionAnswers,
            a => (a.question_id === q._id),
          );
          // console.log('Matched ans:', ans);
          if (ans) {
            return {
              question_id: ans.question_id,
              text: ans.text,
            };
          }
          return {
            question_id: q._id,
            text: '',
          };
        },
      );
    }
    window.onbeforeunload = undefined;
    return _.assign({}, state, {
      currentProblem: new Problem(action.payload),
      currentAnswers: newCurrentAnswersState,
      currentAnswersIsDirty: false,
    });
  },

  /* CHANGE_ANSWER_VALUE */
  [AT.CHANGE_ANSWER_VALUE]: (state, action) => {
    const {
      answerIdx,
      newValue,
    } = action.payload;
    const currentAnswersNewState = _.cloneDeep(state.currentAnswers);
    currentAnswersNewState[answerIdx].text = newValue;
    window.onbeforeunload = (ev) => {
      const message = 'Are you sure you want to close this page? Your current changes will not be saved.';
      const e = ev || window.event;
      // For IE and Firefox
      if (e) {
        e.returnValue = message;
      }
      // For Safari
      return message;
    };
    return _.assign({}, state, {
      currentAnswers: currentAnswersNewState,
      currentAnswersIsDirty: true,
    });
  },

};

/**
 * Export reducer function
 * @param state: last state
 * @param action: dispatched action
 * @return {*}
 */
function reducerFn(state = initState, action) {
  if (
    (typeof action.actionId !== 'undefined') &&
    (_.includes(state.asyncActionIdsInObserve, action.actionId) === false)
  ) {
    // Overdue async action will be ignored
    return state;
  }
  const handler = handleDispatches[action.type || ''] ||
    (stateParam => stateParam);
  return handler(state, action);
}

export default reducerFn;


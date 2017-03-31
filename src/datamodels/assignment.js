/**
 * Created by joshoy on 2017/3/27.
 */

import _ from 'lodash';
import moment from 'moment';

import Problem from './problem';

export default class Assignment {

  constructor(initObj, allSubmissionAnswers = []) {
    this._id = initObj._id;
    this.name = initObj.name;
    this.begin_at = initObj.begin_at;
    this.end_at = initObj.end_at;
    this.problems = _.map(initObj.problems, p => new Problem(p)) || [];
    this.visible = initObj.visible;
    this.submissions = initObj.submissions;
    /**
     * Check complete status for each problem in this assignment
     */
    if (allSubmissionAnswers && allSubmissionAnswers.length) {
      _.forEach(this.problems, (p) => {
        _.forEach(p.questions, (q) => {
          const targetAnswer = _.find(
            allSubmissionAnswers,
            answer => answer.question_id === q._id,
          );
          if (targetAnswer && targetAnswer.text) {
            _.assign(q, {
              completedTag: true,
            });
          }
        });
        const isCompletedPartial = !!(_.find(p.questions, q => q.completedTag === true));
        const isCompletedFull = !(_.find(p.questions, q => q.completedTag === false));
        if (isCompletedPartial) {
          _.assign(p, {
            type: 'halfAnswered',
          });
        }
        if (isCompletedFull) {
          _.assign(p, {
            type: 'answered',
          });
        }
      });
    }
  }

  getBeginAtMoment() {
    return moment(this.begin_at);
  }

  getEndAtMoment() {
    return moment(this.end_at);
  }

}

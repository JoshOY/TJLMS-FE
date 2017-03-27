/**
 * Created by joshoy on 2017/3/27.
 */

import _ from 'lodash';

import Question from './question';

export default class Problem {

  /**
   * Problem data model instance constructor
   * @param initObj
   */
  constructor(initObj) {
    this.id = initObj.id;
    this.order = initObj.order;
    this.text = initObj.text;
    this.questions = _.map(initObj.questions, q => new Question(q));
  }

}

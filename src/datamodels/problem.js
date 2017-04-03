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
    this._id = initObj._id;
    this.order = initObj.order;
    this.text = initObj.text;
    this.questions = _.map(initObj.questions, q => new Question(q));
    this.visible = initObj.visible;
    this.type = initObj.type || 'default';
  }

  setText(newText) {
    const ret = _.cloneDeep(this);
    ret.text = newText;
    return ret;
  }

  setQuestionNum(newQuestionNum) {
    const ret = _.cloneDeep(this);
    while (newQuestionNum > ret.questions.length) {
      ret.questions.push(new Question({
        text: '',
      }));
    }
    while (newQuestionNum < ret.questions.length) {
      ret.questions.pop();
    }
    return ret;
  }

  setQuestionText(questionIdx, newQText) {
    const ret = _.clone(this);
    ret.questions[questionIdx].text = newQText;
    return ret;
  }

  setQuestionOrder(newProblemOrder) {
    const ret = _.cloneDeep(this);
    ret.order = newProblemOrder;
    return ret;
  }

  setVisible(newState) {
    const ret = _.cloneDeep(this);
    ret.visible = newState;
    return ret;
  }

  getUpdateObject() {
    return {
      ptext: this.text,
      qtexts: _.map(this.questions, q => q.text),
    };
  }

  getUpdateMetaObject() {
    return {
      order: this.order,
      visible: this.visible,
    };
  }
}

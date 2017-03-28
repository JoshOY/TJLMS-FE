/**
 * Created by joshoy on 2017/3/27.
 */

export default class Question {

  /**
   * Question data model instance constructor
   * @param initObj
   */
  constructor(initObj) {
    this._id = initObj._id;
    this.text = initObj.text;
  }

}

export default class QTag {
  /**
   * Instance constructor
   * @param {string} title
   * @param {string} state - should be one of [
   *   'default', 'current', 'halfAnswered', 'answered', 'null'
   * ]
   */
  constructor(title = '', state = 'default') {
    this.title = title;
    this.state = state;
  }
}

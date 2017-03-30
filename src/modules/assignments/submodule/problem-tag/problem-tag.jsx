import React, { PropTypes as P } from 'react';
import classNames from 'classnames';

class ProblemTag extends React.Component {

  static propTypes = {
    children: P.node,
    type: P.oneOf(['default', 'current', 'halfAnswered', 'answered', 'null']),
  };

  static defaultProps = {
    children: '',
    type: 'default',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getElemClassName = (type) => {
    let stateClassName = '';
    switch (type) {
    case 'current':
      stateClassName = 'assignments-question-tag--current';
      break;
    case 'halfAnswered':
      stateClassName = 'assignments-question-tag--half-answered';
      break;
    case 'answered':
      stateClassName = 'assignments-question-tag--answered';
      break;
    case 'null':
      stateClassName = 'assignments-question-tag--null';
      break;
    default:
      stateClassName = '';
    }
    return classNames(
      'assignments-question-tag',
      stateClassName,
    );
  };

  render() {
    return (
      <div className={this.getElemClassName(this.props.type)}>
        {this.props.children}
      </div>
    );
  }

}

export default ProblemTag;

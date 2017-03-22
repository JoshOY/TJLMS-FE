import React, { PropTypes as P } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';

class AnswersTextArea extends React.PureComponent {

  static propTypes = {
    value: P.string,
    onChange: P.func,
    rows: P.number,
    label: P.number.isRequired,
    className: P.string,
  };

  static defaultProps = {
    value: undefined,
    onChange: undefined,
    rows: 4,
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (ev) => {
    if (typeof this.props.onChange !== 'undefined') {
      return this.props.onChange(ev);
    }
    // else
    return this.setState({
      ...this.state,
      value: ev.target.value,
    });
  };

  render() {
    const textValue = (typeof this.props.value === 'undefined') ?
      this.state.value : this.props.value;
    const elemClassName = classNames('answers-text-area', this.props.className);
    return (
      <div className={elemClassName}>
        <label htmlFor={`ans-id-${this.props.label}`}>
          Answer {this.props.label}:
        </label>
        <Input
          id={`ans-id-${this.props.label}`}
          type="textarea"
          rows={this.props.rows}
          value={textValue}
          onChange={this.onChange}
        />
      </div>
    );
  }

}

export default AnswersTextArea;

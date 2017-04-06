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
    disabled: P.bool,
  };

  static defaultProps = {
    value: undefined,
    onChange: undefined,
    rows: 8,
    className: '',
    disabled: false,
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
        <Input
          id={`ans-id-${this.props.label}`}
          type="textarea"
          rows={this.props.rows}
          value={textValue}
          onChange={this.onChange}
          disabled={this.props.disabled || false}
        />
      </div>
    );
  }

}

export default AnswersTextArea;

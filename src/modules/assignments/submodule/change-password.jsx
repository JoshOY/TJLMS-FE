/**
 * @author joshoy
 * Created on 2017/4/1
 */

import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Input, Button, message } from 'antd';

import Action from '../actions';

class ChangePassword extends React.Component {

  static propTypes = {
    dispatch: P.func.isRequired,
  };

  static defaultProps = {};

  static mapStateToProps = () => ({});

  static mapDispatchesToProps = dispatch => ({
    dispatch,
  });

  constructor(props) {
    super(props);
    this.state = {
      newPwdValue: '',
      newPwdRepeatValue: '',
    };
  }

  componentDidMount() {
  }

  onChangePwd = (ev) => {
    const newValue = ev.target.value;
    return this.setState({
      ...this.state,
      newPwdValue: newValue,
    });
  };

  onChangeRepeatPwd = (ev) => {
    const newValue = ev.target.value;
    return this.setState({
      ...this.state,
      newPwdRepeatValue: newValue,
    });
  };

  onClickChangePwdBtn = () => {
    if (this.state.newPwdValue !== this.state.newPwdRepeatValue) {
      return message.error('Repeat password do not match.');
    }
    return this.props.dispatch(Action.changePwdAsync(this.state.newPwdValue));
  };

  render() {
    return (
      <div className="assignments-change-pwd">
        <h1 className="text-align-center">Change password</h1>
        <div className="m-t-md assignments-change-pwd__input-wrapper">
          <div>
            <label htmlFor="new-pwd">Your new password:</label>
            <Input
              id="new-pwd"
              type="password"
              value={this.state.newPwdValue}
              onChange={this.onChangePwd}
            />
          </div>
          <div>
            <label htmlFor="new-pwd-repeat">Repeat your new password:</label>
            <Input
              id="new-pwd-repeat"
              type="password"
              value={this.state.newPwdRepeatValue}
              onChange={this.onChangeRepeatPwd}
            />
          </div>
          <div className="m-t-md">
            <Button
              type="primary"
              onClick={this.onClickChangePwdBtn}
            >
              Change password
            </Button>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(
  ChangePassword.mapStateToProps,
  ChangePassword.mapDispatchesToProps,
)(ChangePassword);

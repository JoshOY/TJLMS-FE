import React from 'react';
import { connect } from 'react-redux';

/**
 * module styles
 */
import './styles/index.sass';

/**
 * submodules
 */
import LoginForm from './submodules/login-form';

class LoginModule extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-module login">
        <div className="login__form-container">
          <h1>TJLMS - 登录</h1>
          <LoginForm />
        </div>
      </div>
    );
  }

}

export default connect()(LoginModule);

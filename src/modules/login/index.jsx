import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
 * module styles
 */
import './styles/index.sass';

/**
 * submodules
 */
import LoginForm from './submodules/login-form';

/**
 * Import actions
 */
import AuthActions from '../auth/actions';

class LoginModule extends React.Component {

  static propTypes = {
    userStatus: P.object,
  };

  static defaultProps = {
    userStatus: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.userStatus) {
      return null;
    }
    const asyncFn = async (self) => {
      await self.props.fetchUserStatus();
    };
    return asyncFn(this);
  }

  render() {
    if (this.props.userStatus) {
      return (
        <Redirect to="/auth" />
      );
    }
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

const mapStateToProps = state => ({
  userStatus: state.auth.userStatus,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
  fetchUserStatus: async () => dispatch(await AuthActions.fetchUserStatusAsync(dispatch)()),
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(LoginModule);

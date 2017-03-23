import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Actions from './actions';

class LoginModule extends React.Component {

  static propTypes = {
    isLogin: P.bool.isRequired,
    loginCode: P.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.isLogin) {
      return null;
    }
    const asyncFn = async (self) => {
      await self.props.fetchUserStatus();
    };
    return asyncFn(this);
  }

  render() {
    const { loginCode } = this.props;
    if (loginCode && (loginCode === 401)) {
      return (
        <Redirect to="/login" />
      );
    } else if (loginCode && (loginCode === 200)) {
      return (
        <Redirect to="/assignments" />
      );
    }
    return (
      <div className="app-module auth">
        <h1 className="text-align-center p-t-lg">Loading...</h1>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const subState = state.auth;
  return {
    // from redux store
    isLogin: subState.isLogin,
    loginCode: subState.loginCode,
  };
};

const mapDispatchesToProps = dispatch => ({
  dispatch,
  fetchUserStatus: async () => dispatch(await Actions.fetchUserStatusAsync(dispatch)()),
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(LoginModule);

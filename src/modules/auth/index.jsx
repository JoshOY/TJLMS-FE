import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Actions from './actions';
import Validation from './validation';

class LoginModule extends React.Component {

  static propTypes = {
    loginCode: P.number.isRequired,
    userStatus: P.shape({
      realname: P.string,
      role: P.string,
      student_number: P.oneOfType([P.number, P.string]),
      username: P.string,
    }),
  };

  static defaultProps = {
    userStatus: null,
  };

  static Validation = Validation;

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
    const { loginCode, userStatus } = this.props;
    if (loginCode && (loginCode === 401)) {
      return (
        <Redirect to="/login" />
      );
    } else if (loginCode && (loginCode === 200)) {
      switch (userStatus.role) {
      case 'student':
        if (userStatus.first) {
          return (<Redirect to="/assignments/change-pwd" />);
        }
        return (<Redirect to="/assignments" />);
      case 'admin':
      case 'ta':
        return (<Redirect to="/admin" />);
      default:
        return (<Redirect to="/login" />);
      }
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
    loginCode: subState.loginCode,
    userStatus: subState.userStatus,
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

import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import Actions from './actions';

class Validation extends React.Component {

  static propTypes = {
    // from external
    children: P.node.isRequired,
    allowedRoles: P.arrayOf(P.string),
    // from redux store
    loginCode: P.number,
    userStatus: P.shape({
      realname: P.string,
      role: P.string,
      student_number: P.oneOfType([P.number, P.string]),
      username: P.string,
    }),
  };

  static defaultProps = {
    loginCode: 0,
    allowedRoles: [],
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
    const { loginCode, userStatus } = this.props;
    if (loginCode && (loginCode === 401)) {
      return (
        <Redirect to="/login" />
      );
    } else if (loginCode && (loginCode === 200)) {
      if (_.includes(this.props.allowedRoles, userStatus.role)) {
        return (this.props.children);
      }
      return (<Redirect to="/" />);
    }
    return (
      <div>
        <h1 className="text-align-center">Loading...</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const subState = state.auth;
  return {
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
)(Validation);

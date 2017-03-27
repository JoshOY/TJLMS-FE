import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import { Input, DatePicker, Switch, Icon, Button } from 'antd';

import './styles/index.sass';

import Actions from './actions';
import AssignmentManagement from './submodules/assignment-management';

const RangePicker = DatePicker.RangePicker;

class AdminModule extends React.Component {

  static propTypes = {
    dispatch: P.func.isRequired,
    match: P.object.isRequired,
    // match: P.object.isRequired,
    userStatus: P.shape({
      realname: P.string,
      role: P.string,
      student_number: P.oneOfType([P.number, P.string]),
      username: P.string,
    }),
    assignmentList: P.array,
    assignmentListIsLoading: P.bool,
    children: P.node,
  };

  static defaultProps = {
    userStatus: null,
    assignmentListIsLoading: false,
    assignmentList: [],
    children: [],
  };

  static AssignmentManagement = AssignmentManagement;

  constructor(props) {
    super(props);
    this.state = {
      createAssignmentName: '',
      createAssignmentTimeStart: moment(),
      createAssignmentTimeEnd: moment(),
      createAssignmentVisible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchAssignmentListAsync());
  }

  onClickCreateAssignmentBtn = () => {
    this.props.dispatch(Actions.createAssignmentAsync(
      this.state.createAssignmentName,
      this.state.createAssignmentTimeStart,
      this.state.createAssignmentTimeEnd,
      this.state.createAssignmentVisible,
    )).then((respObj) => {
      if (respObj.code === 200) {
        this.props.dispatch(Actions.fetchAssignmentListAsync());
      }
    });
  };

  stateValueChg = {
    newAssignmentName: (ev) => {
      const newValue = ev.target.value;
      return this.setState({
        ...this.state,
        createAssignmentName: newValue,
      });
    },
    newAssignmentAvailableTime: (dates) => {
      const newValueStart = dates[0];
      const newValueEnd = dates[1];
      return this.setState({
        ...this.state,
        createAssignmentTimeStart: newValueStart,
        createAssignmentTimeEnd: newValueEnd,
      });
    },
    newAssignmentVisible: () => this.setState({
      ...this.state,
      createAssignmentVisible: !this.state.createAssignmentVisible,
    }),
  };

  renderAssignmentsList = () => {
    if (this.props.assignmentListIsLoading) {
      return (
        <div>Loading assignments...</div>
      );
    }
    // else
    if (!this.props.assignmentList.length) {
      return (
        <div>No assignment created yet.</div>
      );
    }
    return (
      _.map(this.props.assignmentList, assignmentObj => (
        <li key={assignmentObj.id}>
          <Link to={`${this.props.match.path}/${assignmentObj.id}`}>{assignmentObj.name}</Link>
          <span>({assignmentObj.id})</span>
        </li>
      ))
    );
  };

  render() {
    // console.log(this.props.match);
    const { userStatus } = this.props;
    return (
      <div className="app-module relative full-size admin">
        <h1 className="text-align-center">Welcome, { userStatus ? userStatus.username : '' }!</h1>
        <div className="admin-wrapper">
          <div className="admin__assignments">
            <h2>Assignments created</h2>
            <ol>
              {this.renderAssignmentsList()}
            </ol>
          </div>
          {/* Create assignment */}
          <div className="m-t-lg admin__create-assignments">
            <h2>Create assignment</h2>
            <div className="form">
              <div>
                <label htmlFor="id-create-assignment-name">
                  New assignment name:
                </label>
                <Input
                  id="id-create-assignment-name"
                  type="text"
                  value={this.state.createAssignmentName}
                  onChange={this.stateValueChg.newAssignmentName}
                />
                <label htmlFor="id-create-assignment-time-range">
                  Available time:
                </label>
                <br />
                <RangePicker
                  id="id-create-assignment-time-range"
                  allowClear={false}
                  value={[this.state.createAssignmentTimeStart, this.state.createAssignmentTimeEnd]}
                  onChange={this.stateValueChg.newAssignmentAvailableTime}
                />
                <br />
                <label htmlFor="id-create-assignment-visible">
                  Visible:
                </label>
                <br />
                <Switch
                  checked={this.state.createAssignmentVisible}
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="cross" />}
                  onChange={this.stateValueChg.newAssignmentVisible}
                />
                <br />
                <Button
                  className="m-t-md"
                  type="primary"
                  onClick={this.onClickCreateAssignmentBtn}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
          {/* Manage assignment */}
          <div className="m-t-md">
            <h2>Manage assignment</h2>
            <div className="admin__assignment-manage">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  userStatus: state.auth.userStatus,
  assignmentList: state.admin.assignmentList,
  assignmentListIsLoading: state.admin.assignmentListIsLoading,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(AdminModule);

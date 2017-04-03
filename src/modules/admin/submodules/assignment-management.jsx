import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Route, Link } from 'react-router-dom';
import { Button, DatePicker, Input, Icon, Switch } from 'antd';

import Actions from '../actions';
import NewProblemCreator from './new-problem-creator';
import ProblemManager from './problem-manager';

const RangePicker = DatePicker.RangePicker;

class AssignmentManagement extends React.Component {

  static propTypes = {
    // from redux
    dispatch: P.func.isRequired,
    match: P.object.isRequired,
    manageAssignmentObj: P.object,
  };

  static defaultProps = {
    manageAssignmentId: null,
    manageAssignmentObj: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.disableInspect = {
      match: this.props.match,
    };
  }

  componentDidMount() {
    this.fetchAssignmentDetailAsync(this.props.match.params.assignmentId);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.assignmentId &&
      nextProps.match &&
      nextProps.match.params &&
      nextProps.match.params.assignmentId &&
      (this.props.match.params.assignmentId !== nextProps.match.params.assignmentId)
    ) {
      this.fetchAssignmentDetailAsync(nextProps.match.params.assignmentId);
    }
  }

  onChangeName = (ev) => {
    this.props.dispatch(Actions.updateEditingAssignment(
      this.props.manageAssignmentObj.setName(ev.target.value),
    ));
  };

  onChangeTimeRange = (dates) => {
    this.props.dispatch(Actions.updateEditingAssignment(
      this.props.manageAssignmentObj.setTimeRange(dates[0], dates[1]),
    ));
  };

  onChangeVisible = (checked) => {
    this.props.dispatch(Actions.updateEditingAssignment(
      this.props.manageAssignmentObj.setVisible(checked),
    ));
  };

  onSubmitAssignmentChanges = () => {
    this.props.dispatch(Actions.saveChangesOfEditingAssignmentAsync(
      this.props.manageAssignmentObj,
    ));
  };

  fetchAssignmentDetailAsync = assignmentId =>
    this.props.dispatch(Actions.fetchAssignmentDetailAsync(assignmentId));

  renderProblems = (problems) => {
    const currentUrl = this.props.match.path
      .replace(':assignmentId', this.props.match.params.assignmentId);
    if ((!problems) || (!problems.length)) {
      return (
        <div>
          <span>No problems available.</span>
          <Link to={`${currentUrl}/new`}>Create a new question</Link>.
        </div>
      );
    }
    const ret = _.map(problems, p => (
      <Link to={`${currentUrl}/${p._id}`} className="problem-item" key={p._id}>
        {`Problem ${p.order}`}
      </Link>
    ));
    return ret.concat(
      <Link key="new" className="problem-item" to={`${currentUrl}/new`}>
        Create a new question
      </Link>,
    );
  };

  render() {
    const { manageAssignmentObj } = this.props;
    return (
      <div className="m-t-s admin-assignment-management">
        <div>
          <h3>Object ID: {manageAssignmentObj ? manageAssignmentObj._id : ''}</h3>
        </div>
        <div>
          <span>Name: </span>
          <Input
            value={manageAssignmentObj ? manageAssignmentObj.name : ''}
            onChange={this.onChangeName}
          />
        </div>
        <div className="m-t-s">
          <span>Available time range:</span>
          <br />
          <RangePicker
            value={[
              manageAssignmentObj ?
                manageAssignmentObj.getBeginAtMoment() : moment(),
              manageAssignmentObj ?
                manageAssignmentObj.getEndAtMoment() : moment(),
            ]}
            onChange={this.onChangeTimeRange}
          />
        </div>
        <div className="m-t-s">
          <span>Assignment visible:</span>
          <br />
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
            checked={manageAssignmentObj ? manageAssignmentObj.visible : false}
            onChange={this.onChangeVisible}
          />
        </div>
        <div className="m-t-s">
          <Button
            type="primary"
            onClick={this.onSubmitAssignmentChanges}
          >
            Save assignment config
          </Button>
        </div>
        <div className="m-t-lg problem-items-container">
          <h3>Created problems</h3>
          <div>{this.renderProblems(manageAssignmentObj ? manageAssignmentObj.problems : [])}</div>
        </div>
        <div className="m-t-s">
          {/* Create a new problem */}
          <Route
            path={`${this.props.match.path}/new`}
            component={({ match }) => (
              <NewProblemCreator
                assignmentId={this.props.match ? this.props.match.params.assignmentId : ''}
                order={manageAssignmentObj ? (manageAssignmentObj.problems.length + 1) : 1}
                match={match}
              />
            )}
          />
          {/* Edit a problem */}
          <Route
            path={`${this.props.match.path}/:problemId`}
            component={ProblemManager}
          />
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  manageAssignmentObj: state.admin.manageAssignmentObj,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(AssignmentManagement);

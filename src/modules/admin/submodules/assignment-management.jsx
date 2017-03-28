import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Route, Link } from 'react-router-dom';

import Actions from '../actions';
import NewProblemCreator from './new-problem-creator';
import ProblemManager from './problem-manager';

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
        <h3>Name: {manageAssignmentObj ? manageAssignmentObj.name : ''}</h3>
        <p>Object ID: {manageAssignmentObj ? manageAssignmentObj._id : ''}</p>
        <p>Begin at: {manageAssignmentObj ?
          manageAssignmentObj.getBeginAtMoment().format('YYYY-MM-DD HH:mm:ss') :
          ''}</p>
        <p>End at: {manageAssignmentObj ?
          manageAssignmentObj.getEndAtMoment().format('YYYY-MM-DD HH:mm:ss') :
          ''}</p>
        <div className="problem-items-container">
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

import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Actions from '../actions';
import NewProblemCreator from './new-problem-creator';

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
    if ((!problems) || (!problems.length)) {
      return <span>No problems available.</span>;
    }
    return _.map(problems, p => (
      <span className="problem-item" key={p.id}>
        {`Problem ${p.order}`}
      </span>
    ));
  };

  render() {
    const { manageAssignmentObj } = this.props;
    return (
      <div className="m-t-s admin-assignment-management">
        <h3>Name: {manageAssignmentObj ? manageAssignmentObj.name : ''}</h3>
        <p>Object ID: {manageAssignmentObj ? manageAssignmentObj.id : ''}</p>
        <p>Begin at: {manageAssignmentObj ? manageAssignmentObj.begin_at : ''}</p>
        <p>End at: {manageAssignmentObj ? manageAssignmentObj.end_at : ''}</p>
        <div className="problem-items-container">
          {this.renderProblems(manageAssignmentObj ? manageAssignmentObj.problems : [])}
        </div>
        <div className="m-t-s">
          <h3>Create a new problem</h3>
          <p>PS: If you make a mistake, please edit data model on MongoDB directly. _(:з」∠)_</p>
          <NewProblemCreator
            assignmentId={this.props.match ? this.props.match.params.assignmentId : ''}
            order={manageAssignmentObj ? (manageAssignmentObj.problems.length + 1) : 1}
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

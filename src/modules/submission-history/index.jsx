/**
 * @author joshoy
 * Created on 2017/4/6
 */

import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import './styles/index.sass';

import Actions from './actions';

class SubmissionHistroy extends React.Component {

  static propTypes = {
    dispatch: P.func.isRequired,
    match: P.object.isRequired,
    currentProblemHistoryList: P.array.isRequired,
    currentHistoryDetails: P.object,
  };

  static defaultProps = {
    currentHistoryDetails: null,
  };

  static mapStateToProps = (state) => {
    const subState = state.submissionHistory;
    return {
      currentProblemHistoryList: subState.currentProblemHistoryList,
      currentHistoryDetails: subState.currentHistoryDetails,
    };
  };

  static mapDispatchesToProps = dispatch => ({
    dispatch,
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match, dispatch } = this.props;
    const assignmentId = match.params.assignmentId;
    const problemId = match.params.problemId;
    dispatch(Actions.fetchProblemHistoryList(assignmentId, problemId));
    const historyId = match.params.historyId;
    if (historyId) {
      dispatch(Actions.fetchProblemHistoryDetail(historyId));
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { match, dispatch } = nextProps;
    const historyId = match.params.historyId;
    // dispatch(Actions.fetchProblemHistoryList(assignmentId, problemId));
    if (this.props.match.params.historyId !== historyId) {
      dispatch(Actions.fetchProblemHistoryDetail(historyId));
    }
  };

  renderList() {
    const { match } = this.props;
    const assignmentId = match.params.assignmentId;
    const problemId = match.params.problemId;
    const list = _.map(this.props.currentProblemHistoryList, obj => (
      <li key={`${obj._id}`}>
        <Link to={`/submission-history/${assignmentId}/${problemId}/${obj._id}`}>
          Record @ {moment(obj.submit_at).format('YYYY-MM-DD HH:mm:ss')} (UTC+8)
        </Link>
      </li>
    ));
    return (
      <ol>
        {list}
      </ol>
    );
  }

  renderDetail = () => {
    const { currentHistoryDetails } = this.props;
    if (!currentHistoryDetails) {
      return [];
    }
    // if exist
    const answers = _.map(currentHistoryDetails.answers, (ans, idx) => (
      <li key={`${ans._id}`}>
        <h3>Answer {idx + 1}</h3>
        <p>{ans.text}</p>
      </li>
    ));
    return (
      <div>
        <h2>
          <span>Submission details for record @</span>
          <span>{moment(currentHistoryDetails.submit_at).format('YYYY-MM-DD HH:mm:ss')} (UTC+8)</span>
        </h2>
        <ul>
          {answers}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div className="submission-history">
        <div className="left-wrapper">
          <div className="p-l-md p-r-md p-t-md p-b-md">
            <h1>Submission History</h1>
            {this.renderList()}
          </div>
        </div>
        <div className="right-wrapper">
          <div className="p-l-md p-r-md p-t-md p-b-md">
            {this.renderDetail()}
          </div>
        </div>
      </div>
    );
  }

}

export default connect(
  SubmissionHistroy.mapStateToProps,
  SubmissionHistroy.mapDispatchesToProps,
)(SubmissionHistroy);

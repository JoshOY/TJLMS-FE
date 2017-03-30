import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { Button } from 'antd';
import Assignment from 'src/datamodels/assignment';

/**
 * Import styles
 */
import './styles/index.sass';

/**
 * Import submodules or components
 */
import Aside from './submodule/aside';
import { ProblemTagsContainer } from './submodule/problem-tag';
import AnswersTextArea from './submodule/answers-text-area';
import CodeRenderer from '../../common/components/code-renderer';

/**
 * Import Actions
 */
import Actions from './actions';

// mock data
import mockDemoQuestionMarkdown from '../../common/mockdata/demo-question-markdown';

class AssignmentsModule extends React.Component {

  static propTypes = {
    dispatch: P.func.isRequired,
    match: P.object.isRequired,
    currentAssignment: P.instanceOf(Assignment),
  };

  static defaultProps = {
    currentAssignment: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.__disableInspect = {
      currentAssignment: this.props.currentAssignment,
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchAssignmentListAsync());
    if (this.props.match.params.assignmentId) {
      const { assignmentId } = this.props.match.params;
      this.props.dispatch(
        Actions.fetchAssignmentDetailAsync(assignmentId),
      ).then(() => {
        if (this.props.match.params.problemId) {
          // console.log(this.props.match.params.problemId);
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.assignmentId &&
      (nextProps.match.params.assignmentId !== this.props.match.params.assignmentId)
    ) {
      // request
      this.props.dispatch(
        Actions.fetchAssignmentDetailAsync(nextProps.match.params.assignmentId),
      ).then(() => {
        if (nextProps.match.params.problemId) {
          // console.log(this.props.match.params.problemId);
        }
      });
    }
    if (
      nextProps.match.params.problemId &&
      (nextProps.match.params.problemId !== this.props.match.params.problemId)
    ) {
      // request
    }
  }

  render() {
    const { currentAssignment } = this.props;
    return (
      <div className="app-module relative full-size assignments">
        <Aside match={this.props.match} />
        <Switch>
          {/* /assignments */}
          <Route path="/assignments" exact>
            <main className="disp-flex assignments__main">
              <h1>Select an assignment to complete.</h1>
            </main>
          </Route>
          {/* /assignments/:assignmentId */}
          <Route path="/assignments/:assignmentId" exact>
            <main className="disp-flex assignments__main">
              <div className="assignments__tags-wrapper">
                <ProblemTagsContainer
                  tags={currentAssignment ? currentAssignment.problems : []}
                  numEachRow={10}
                  assignmentId={this.props.match.params.assignmentId}
                />
              </div>
            </main>
          </Route>
          {/* /assignments/:assignmentId/:problemId */}
          <Route path="/assignments/:assignmentId/:problemId" exact>
            <main className="disp-flex assignments__main">
              <div className="assignments__tags-wrapper">
                <ProblemTagsContainer
                  tags={currentAssignment ? currentAssignment.problems : []}
                  numEachRow={10}
                  assignmentId={this.props.match.params.assignmentId}
                />
              </div>
              <div className="assignments__content-container">
                <ReactMarkdown
                  className="app-markdown assignments__content"
                  source={mockDemoQuestionMarkdown}
                  escapeHtml
                  renderers={{
                    CodeBlock: CodeRenderer,
                    Code: CodeRenderer,
                  }}
                />
                <div className="assignments__answers-container">
                  <AnswersTextArea label={1} />
                  <AnswersTextArea label={2} />
                </div>
              </div>
              <div className="assignments__op-btns-container">
                <Button
                  type="primary"
                  size="large"
                >
                  Save
                </Button>
              </div>
            </main>
          </Route>
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  currentAssignment: state.assignments.currentAssignment,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(AssignmentsModule);

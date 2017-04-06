import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Prompt } from 'react-router-dom';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { Button } from 'antd';
import moment from 'moment';

import Assignment from 'src/datamodels/assignment';
import Problem from 'src/datamodels/problem';

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
import LinkRenderer from '../../common/components/link-renderer';
import ChangePassword from './submodule/change-password';

/**
 * Import Actions
 */
import Actions from './actions';

// mock data
// import mockDemoQuestionMarkdown from '../../common/mockdata/demo-question-markdown';

class AssignmentsModule extends React.Component {

  static propTypes = {
    dispatch: P.func.isRequired,
    match: P.object.isRequired,
    currentAssignment: P.instanceOf(Assignment),
    currentProblem: P.instanceOf(Problem),
    currentAnswers: P.array,
    currentAnswersIsDirty: P.bool.isRequired,
  };

  static defaultProps = {
    currentAssignment: null,
    currentProblem: null,
    currentAnswers: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.__disableInspect = {
      currentAssignment: this.props.currentAssignment,
    };
  }

  componentDidMount() {
    if (window.UiAutosave) {
      clearTimeout(window.UiAutosave);
      window.UiAutosave = undefined;
    }
    this.props.dispatch(
      Actions.fetchAssignmentListAsync(),
    ).then(() => {
      if (this.props.match.params.assignmentId) {
        const { assignmentId, problemId } = this.props.match.params;
        this.props.dispatch(
          Actions.fetchAssignmentDetailAsync(assignmentId, problemId),
        );
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.assignmentId &&
      (nextProps.match.params.assignmentId !== this.props.match.params.assignmentId)
    ) {
      // request
      this.props.dispatch(
        Actions.fetchAssignmentDetailAsync(
          nextProps.match.params.assignmentId,
          this.props.match.params.problemId,
        ),
      );
    }
    if (
      nextProps.match.params.problemId &&
      (nextProps.match.params.problemId !== this.props.match.params.problemId) &&
      (nextProps.currentAssignment)
    ) {
      if (window.UiAutosave) {
        clearTimeout(window.UiAutosave);
        window.UiAutosave = undefined;
      }
      this.props.dispatch(
        Actions.fetchAssignmentDetailAsync(
          nextProps.match.params.assignmentId,
          this.props.match.params.problemId,
        ),
      ).then(() => {
        this.props.dispatch(Actions.setCurrentProblem(
          _.find(
            nextProps.currentAssignment.problems,
            q => (q._id === nextProps.match.params.problemId),
          ),
        ));
      });
    }
  }

  componentWillUnmount() {
    if (window.UiAutosave) {
      clearTimeout(window.UiAutosave);
      window.UiAutosave = undefined;
    }
  }

  onClickSaveBtn = () => {
    this.props.dispatch(Actions.submitAnswersAsync())
      .then((err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          return null;
        }
        return this.props.dispatch(
          Actions.fetchAssignmentDetailAsync(
            this.props.currentAssignment._id,
            this.props.currentProblem._id,
          ),
        );
      });
  };

  renderQuestionsAndAnswers = () => {
    const { currentAssignment, currentProblem, currentAnswers, dispatch } = this.props;
    if (!currentProblem) {
      return [];
    }
    const ret = _.map(currentProblem.questions, (q, idx) => (
      <li key={`question-item-${q._id}`}>
        <ReactMarkdown
          className="app-markdown assignments__question-item"
          source={q.text || ''}
          escapeHtml
          renderers={{
            CodeBlock: CodeRenderer,
            Code: CodeRenderer,
            Link: LinkRenderer,
          }}
        />
        {/* disable textarea if this problem is not available */}
        <AnswersTextArea
          label={idx + 1}
          value={currentAnswers[idx].text}
          onChange={(ev) => {
            dispatch(Actions.changeAnswerValue(idx, ev.target.value));
          }}
          disabled={
            (currentProblem.read_only) ||
            (currentAssignment.begin_at > (new Date()).getTime()) ||
            (currentAssignment.end_at < (new Date()).getTime())
          }
        />
      </li>
    ));
    return (
      <div className="assignments__answers-container">
        <ol className="assignments__answers-list">
          {ret}
        </ol>
      </div>
    );
  };

  render() {
    const {
      currentAssignment,
      currentProblem,
      currentAnswersIsDirty,
    } = this.props;
    return (
      <div className="app-module relative full-size assignments">
        <Aside match={this.props.match} />
        <Switch>
          {/* /assignments */}
          <Route path="/assignments" exact>
            <main className="disp-flex assignments__main">
              <h1 className="text-align-center">Select an assignment to complete.</h1>
            </main>
          </Route>
          <Route path="/assignments/change-pwd" exact>
            <main className="disp-flex assignments__main">
              <ChangePassword />
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
                  problemId={this.props.match.params.problemId}
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
                  problemId={this.props.match.params.problemId}
                />
              </div>
              <div className="assignments__content-container">
                <ReactMarkdown
                  className="app-markdown assignments__content"
                  source={currentProblem ? currentProblem.text : ''}
                  escapeHtml
                  renderers={{
                    CodeBlock: CodeRenderer,
                    Code: CodeRenderer,
                    Link: LinkRenderer,
                  }}
                />
                {this.renderQuestionsAndAnswers()}
                <Prompt
                  when={currentAnswersIsDirty}
                  message={
                    () =>
                      'Are you sure you want to go to another page? Your current changes will not be saved.'
                  }
                />
              </div>
              <div className="assignments__op-btns-container">
                <Button
                  type="primary"
                  size="large"
                  onClick={this.onClickSaveBtn}
                  disabled={
                    (currentAssignment ?
                      (currentAssignment.end_at < (new Date()).getTime()) :
                      false
                    ) ||
                    (!currentAnswersIsDirty)
                  }
                >
                  Save
                </Button>
                <a
                  href={`/submission-history/${currentAssignment ? currentAssignment._id : ''}/${currentProblem ? currentProblem._id : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="m-l-md"
                    type="primary"
                    size="large"
                  >
                    View submission history
                  </Button>
                </a>
                <div className="float-right">
                  <span>This assignment will be closed at: </span>
                  <span>
                    {
                    currentAssignment ?
                      moment(currentAssignment.end_at).format('YYYY-MM-DD HH:mm:ss') :
                      ''
                    }
                    &nbsp;UTC+8
                  </span>
                </div>
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
  currentProblem: state.assignments.currentProblem,
  currentAnswers: state.assignments.currentAnswers,
  currentAnswersIsDirty: state.assignments.currentAnswersIsDirty,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(AssignmentsModule);

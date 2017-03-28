import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Input, InputNumber, Button } from 'antd';
import _ from 'lodash';
import Problem from 'src/datamodels/problem';

import Actions from '../actions';

class ProblemManager extends React.Component {

  static propTypes = {
    // from redux
    dispatch: P.func.isRequired,
    editingProblem: P.instanceOf(Problem),
    manageAssignmentObj: P.object,
    // from external
    match: P.object.isRequired,
  };

  static defaultProps = {
    editingProblem: null,
    manageAssignmentObj: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.__disableInspect = {
      manageAssignmentObj: this.props.manageAssignmentObj,
    };
  }

  componentDidMount() {
    if (this.props.manageAssignmentObj) {
      this.props.dispatch(Actions.loadEditingProblem(this.props.match.params.problemId));
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.manageAssignmentObj && (!this.props.manageAssignmentObj)) {
      this.props.dispatch(Actions.loadEditingProblem(nextProps.match.params.problemId));
      return null;
    }
    if (
      nextProps.manageAssignmentObj &&
      (nextProps.match.params.problemId !== this.props.match.params.problemId)
    ) {
      this.props.dispatch(Actions.loadEditingProblem(nextProps.match.params.problemId));
    }
    return null;
  }

  componentWillUnmount() {
  }

  onTextChange = (ev) => {
    const { editingProblem } = this.props;
    const newState = editingProblem.setText(ev.target.value);
    this.props.dispatch(Actions.updateEditingProblem(newState));
  };

  onQNumChange = (newQNum) => {
    const { editingProblem } = this.props;
    const newState = editingProblem.setQuestionNum(newQNum);
    this.props.dispatch(Actions.updateEditingProblem(newState));
  };

  onChangeQuestionText = questionIdx => (ev) => {
    const { editingProblem } = this.props;
    const newState = editingProblem.setQuestionText(questionIdx, ev.target.value);
    this.props.dispatch(Actions.updateEditingProblem(newState));
  };

  onClickSaveChangesBtn = () => {
    this.props.dispatch(Actions.saveChangesOfEditingProblemAsync(
      this.props.editingProblem,
    ));
  };

  renderQuestionsSet = () => {
    const { editingProblem } = this.props;
    if (!editingProblem) {
      return [];
    }
    return _.map(editingProblem.questions, (q, idx) => (
      <li key={`question-${idx + 1}`}>
        <h5>{`Question ${idx + 1}:`}</h5>
        <Input
          type="textarea"
          value={q.text}
          onChange={this.onChangeQuestionText(idx)}
        />
      </li>
    ));
  };

  render() {
    const {
      editingProblem,
      match,
    } = this.props;
    if (match.params.problemId === 'new') {
      return <div />;
    }
    return (
      <div className="m-t-s new-problem-creator">
        <h3 className="m-b-s">Manage problem</h3>
        <h4>Problem text (markdown):</h4>
        <Input
          type="textarea"
          rows={8}
          value={editingProblem ? editingProblem.text : ''}
          onChange={this.onTextChange}
        />
        <h4>Total question num:</h4>
        <InputNumber
          min={1}
          value={editingProblem ? editingProblem.questions.length : 1}
          onChange={this.onQNumChange}
        />
        <h4 className="m-t-md m-b-md">Question Texts:</h4>
        <ol className="m-t-md m-b-md">
          {this.renderQuestionsSet()}
        </ol>
        <div className="m-t-md m-b-lg">
          <Button
            type="primary"
            onClick={this.onClickSaveChangesBtn}
          >
            Save changes
          </Button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  manageAssignmentObj: state.admin.manageAssignmentObj,
  editingProblem: state.admin.editingProblem,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(ProblemManager);


import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Input, InputNumber, Button, Switch } from 'antd';
import _ from 'lodash';

import Actions from '../actions';

class NewProblemCreator extends React.Component {

  static propTypes = {
    // from redux
    dispatch: P.func.isRequired,
    creatingProblemTotalQuestionNum: P.number,
    creatingProblemText: P.string,
    creatingProblemQuestionTexts: P.arrayOf(P.string),
    // from external
    assignmentId: P.string.isRequired,
    order: P.number.isRequired,
    creatingProblemVisible: P.bool.isRequired,
  };

  static defaultProps = {
    creatingProblemTotalQuestionNum: 1,
    creatingProblemText: '',
    creatingProblemQuestionTexts: [''],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(Actions.resetNewProblemCreator());
  }

  onTextChange = (ev) => {
    this.props.dispatch(
      Actions.updateProblemCreatorState(
        this.props.creatingProblemTotalQuestionNum,
        ev.target.value,
        this.props.creatingProblemQuestionTexts,
        this.props.creatingProblemVisible,
      ),
    );
  };

  onQNumChange = (newValue) => {
    const newPTexts = this.props.creatingProblemQuestionTexts.concat();
    if (newValue > this.props.creatingProblemTotalQuestionNum) {
      while (newPTexts.length < newValue) {
        newPTexts.push('');
      }
    }
    if (newValue < this.props.creatingProblemTotalQuestionNum) {
      while (newPTexts.length > newValue) {
        newPTexts.pop();
      }
    }
    this.props.dispatch(
      Actions.updateProblemCreatorState(
        newValue,
        this.props.creatingProblemText,
        newPTexts,
        this.props.creatingProblemVisible,
      ),
    );
  };

  onChangeQuestionText = questionIdx => (ev) => {
    const newPTexts = this.props.creatingProblemQuestionTexts.concat();
    newPTexts[questionIdx] = ev.target.value;
    this.props.dispatch(
      Actions.updateProblemCreatorState(
        this.props.creatingProblemTotalQuestionNum,
        this.props.creatingProblemText,
        newPTexts,
        this.props.creatingProblemVisible,
      ),
    );
  };

  onSwitchVisible = (checked) => {
    this.props.dispatch(
      Actions.updateProblemCreatorState(
        this.props.creatingProblemTotalQuestionNum,
        this.props.creatingProblemText,
        this.props.creatingProblemQuestionTexts,
        checked,
      ),
    );
  };

  onClickCreateBtn = () => {
    this.props.dispatch(Actions.createProblemAsync(
      this.props.assignmentId,
      this.props.order,
      this.props.creatingProblemText,
      this.props.creatingProblemQuestionTexts,
      this.props.creatingProblemVisible,
    )).then(() => {
      this.props.dispatch(Actions.resetNewProblemCreator());
      this.props.dispatch(Actions.fetchAssignmentDetailAsync(
        this.props.assignmentId,
      ));
    });
  };

  renderQuestionsSet = () => {
    const {
      creatingProblemTotalQuestionNum,
      creatingProblemQuestionTexts,
    } = this.props;
    if (creatingProblemQuestionTexts.length !== creatingProblemTotalQuestionNum) {
      // adjust ?
    }
    return _.map(creatingProblemQuestionTexts, (text, idx) => (
      <li key={`question-${idx + 1}`}>
        <h5>{`Question ${idx + 1}:`}</h5>
        <Input
          type="textarea"
          value={text}
          onChange={this.onChangeQuestionText(idx)}
        />
      </li>
    ));
  };

  render() {
    const {
      creatingProblemTotalQuestionNum,
      creatingProblemText,
    } = this.props;
    return (
      <div className="m-t-s new-problem-creator">
        <h3 className="m-b-s">Create a new problem</h3>
        <h4>Problem text (markdown):</h4>
        <Input
          type="textarea"
          rows={8}
          value={creatingProblemText}
          onChange={this.onTextChange}
        />
        <h4>Total question num:</h4>
        <InputNumber
          min={1}
          value={creatingProblemTotalQuestionNum}
          onChange={this.onQNumChange}
        />
        <div className="m-t-s">
          <span>Visible: </span>
          <br />
          <Switch
            checked={this.props.creatingProblemVisible}
            onChange={this.onSwitchVisible}
          />
        </div>
        <h4 className="m-t-md m-b-md">Question Texts:</h4>
        <ol className="m-t-md m-b-md">
          {this.renderQuestionsSet()}
        </ol>
        <div className="m-t-md m-b-lg">
          <Button
            type="primary"
            onClick={this.onClickCreateBtn}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  creatingProblemTotalQuestionNum: state.admin.creatingProblemTotalQuestionNum,
  creatingProblemText: state.admin.creatingProblemText,
  creatingProblemQuestionTexts: state.admin.creatingProblemQuestionTexts,
  creatingProblemVisible: state.admin.creatingProblemVisible,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(NewProblemCreator);


import React, { PropTypes as P } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Problem from 'src/datamodels/problem';
import ProblemTag from './problem-tag';

class QuestionTagsContainer extends React.Component {

  static propTypes = {
    tags: P.arrayOf(P.instanceOf(Problem)),
    numEachRow: P.number,
    assignmentId: P.string,
  };

  static defaultProps = {
    tags: [],
    numEachRow: 10,
    assignmentId: '',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTags = (tags, numEachRow) => {
    const rowNum = Math.ceil(tags.length / numEachRow);
    const renderingTagsArray = _.cloneDeep(tags);
    while (renderingTagsArray.length < (rowNum * numEachRow)) {
      renderingTagsArray.push(
        new Problem({
          type: 'null',
        }),
      );
    }
    const ret1 = _.map(renderingTagsArray, (question, idx) => {
      if (question.type === 'null') {
        return (
          <ProblemTag key={`${idx}-null`} type="null" />
        );
      }
      // else
      return (
        <ProblemTag key={`${idx}-${question._id}`} type={question.type}>
          <Link to={`/assignments/${this.props.assignmentId}/${question._id}`}>{`P${idx + 1}`}</Link>
        </ProblemTag>
      );
    });
    const ret2 = _.chunk(ret1, numEachRow);
    const ret3 = _.map(ret2, (chunkedNodes, idx) => {
      const keyStr = `question-tag-row-${idx}`;
      return (
        <div
          className="disp-table-row assignments-question-tags-container__row"
          key={keyStr}
        >
          {chunkedNodes}
        </div>
      );
    });
    return ret3;
  };

  render() {
    return (
      <div
        className="assignments-question-tags-container"
      >
        {
          this.renderTags(
            this.props.tags,
            this.props.numEachRow,
          )
        }
      </div>
    );
  }

}

export default QuestionTagsContainer;

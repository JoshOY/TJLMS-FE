import React, { PropTypes as P } from 'react';
import _ from 'lodash';
import hash from 'object-hash';

import QTag from '../../../../datamodels/qtag';
import QuestionTag from './question-tag.jsx';

class QuestionTagsContainer extends React.Component {

  static propTypes = {
    tags: P.arrayOf(P.instanceOf(QTag)),
    numEachRow: P.number,
  };

  static defaultProps = {
    tags: [],
    numEachRow: 10,
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
        new QTag(`null-${renderingTagsArray.length}`, 'null'),
      );
    }
    return _(renderingTagsArray)
      .map((tag) => {
        if (tag.state === 'null') {
          return (
            <QuestionTag key={hash(tag)} type="null" />
          );
        }
        // else
        return (
          <QuestionTag key={hash(tag)} type={tag.state}>
            {tag.title}
          </QuestionTag>
        );
      })
      .chunk(numEachRow)
      .map((chunkedNodes, idx) => {
        const keyStr = `question-tag-row-${idx}`;
        return (
          <div
            className="disp-table-row assignments-question-tags-container__row"
            key={keyStr}
          >
            {chunkedNodes}
          </div>
        );
      })
      .value();
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

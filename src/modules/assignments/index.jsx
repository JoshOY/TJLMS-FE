import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { Button } from 'antd';

/**
 * Import styles
 */
import './styles/index.sass';

/**
 * Import data models
 */
import QTag from '../../datamodels/qtag';

/**
 * Import submodules or components
 */
import Aside from './submodule/aside';
import { QuestionTagsContainer } from './submodule/question-tag';
import AnswersTextArea from './submodule/answers-text-area';
import CodeRenderer from '../../common/components/code-renderer';

// mock data
import mockDemoQuestionMarkdown from '../../common/mockdata/demo-question-markdown';

const mockTags = _([
  new QTag('P1', 'current'),
  new QTag('P2', 'default'),
  new QTag('P3', 'halfAnswered'),
  new QTag('P4', 'answered'),
  new QTag('P5', 'default'),
  new QTag('P6', 'default'),
  new QTag('P7', 'default'),
  new QTag('P8', 'default'),
  new QTag('P9', 'default'),
  new QTag('P10', 'default'),
  new QTag('P11', 'default'),
  new QTag('P12', 'default'),
]).value();


class AssignmentsModule extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-module relative full-size assignments">
        <Aside />
        <main className="disp-flex assignments__main">
          <div className="assignments__tags-wrapper">
            <QuestionTagsContainer
              tags={mockTags}
              numEachRow={10}
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
      </div>
    );
  }

}

const mapStateToProps = () => ({});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(AssignmentsModule);

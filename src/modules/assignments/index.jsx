import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

/**
 * Import styles
 */
import './styles/index.sass';

/**
 * Import data models
 */
import QTag from '../../datamodels/qtag';

/**
 * Import submodules
 */
import Aside from './submodule/aside.jsx';
import { QuestionTagsContainer } from './submodule/question-tag';

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
        <main className="assignments__main">
          <QuestionTagsContainer
            tags={mockTags}
            numEachRow={10}
          />
          <div>Main body</div>
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

import React, { PropTypes as P } from 'react';
import Lowlight from 'react-lowlight';
// import shallowCompare from 'react-addons-shallow-compare';
// import js from 'highlight.js/lib/languages/javascript';
import cpp from 'highlight.js/lib/languages/cpp';

// Lowlight.registerLanguage('js', js);
Lowlight.registerLanguage('cpp', cpp);

class CodeBlock extends React.PureComponent {

  static displayName = 'CodeBlock';

  static propTypes = {
    literal: P.string,
    language: P.string,
    inline: P.bool,
  };

  static defaultProps = {
    literal: '',
    language: 'js',
    inline: false,
  };

  /*
  // Deprecated, see: https://facebook.github.io/react/docs/shallow-compare.html
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  */

  render() {
    return (
      <Lowlight
        language={this.props.language || 'js'}
        value={this.props.literal}
        inline={this.props.inline}
      />
    );
  }
}

export default CodeBlock;

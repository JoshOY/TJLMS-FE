import React from 'react';

class Bundle extends React.Component {

  static propTypes = {
    load: React.PropTypes.func.isRequired,
    children: React.PropTypes.func,
  };

  static defaultProps = {
    children: () => <div />,
  };

  constructor(props) {
    super(props);
    this.state = {
      mod: null,
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load = (props) => {
    this.setState({
      mod: null,
    });
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod,
      });
    });
  };

  render() {
    return this.props.children(this.state.mod, this.props);
  }
}

export default Bundle;

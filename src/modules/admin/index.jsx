import React from 'react';
import { connect } from 'react-redux';

class AdminModule extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-module relative full-size admin">
        <h1 className="text-align-center">Welcome, Admin!</h1>
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
)(AdminModule);

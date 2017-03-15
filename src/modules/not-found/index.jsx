import React from 'react';

class PageNotFoundModule extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-not-found-module">
        Page not found
      </div>
    );
  }

}

export default PageNotFoundModule;

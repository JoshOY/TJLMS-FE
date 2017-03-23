/**
 * App router
 * @author JoshOY
 * Created on 2017-03-14
 */

import React, { PropTypes as P } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
window.UiHistory = history;
const midware = routerMiddleware(history);

class AppRouter extends React.Component {
  static propTypes = {
    children: P.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <Router>
          <div className="router-root">
            {this.props.children}
          </div>
        </Router>
      </ConnectedRouter>
    );
  }
}
export const middleware = midware;

export default AppRouter;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/**
 * vendor styles
 */
import 'normalize.css';

import AppRouter from '../router.jsx';
import store from '../store';

/**
 * Debug only
 */
window.UiStore = store;

const main = async () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById('app-root'),
  );
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});

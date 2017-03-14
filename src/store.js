/**
 * Redux store
 * @author JoshOY
 * Created on 2017-03-14
 */

import { createStore, applyMiddleware, compose } from 'redux';

import { middleware as appRouterMiddleware } from './router.jsx';
import appReducer from './reducer';

let store = null;

if (window.APP_DEV_ENV) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(
      appRouterMiddleware,
    )),
  );
} else {
  store = createStore(appReducer, applyMiddleware(
    appRouterMiddleware,
  ));
}

const storeExport = store;

export default storeExport;

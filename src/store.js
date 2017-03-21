/**
 * Redux store
 * @author JoshOY
 * Created on 2017-03-14
 */

import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import { middleware as appRouterMiddleware } from './router';
import appReducer from './modules/reducer';

let store = null;

if (window.APP_DEV_ENV) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(
      appRouterMiddleware,
      promiseMiddleware(),
    )),
  );
} else {
  store = createStore(appReducer, applyMiddleware(
    appRouterMiddleware,
    promiseMiddleware(),
  ));
}

const storeExport = store;

export default storeExport;

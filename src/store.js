/**
 * Redux store
 * @author JoshOY
 * Created on 2017-03-14
 */


import { createStore, applyMiddleware } from 'redux';

import { middleware as appRouterMiddleware } from './router.jsx';
import appStore from './reducer';

const store = createStore(
  appStore,
  applyMiddleware(appRouterMiddleware),
);

export default store;

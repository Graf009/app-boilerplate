/*
* @Author: Oleg Orlov
* @Date:   2015-10-29 14:40:19
*/

import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';

import DevTools from '_containers/DevTools/DevTools';
import adapter from '_utils/localStorage';
import api from './middleware/api';
import persistedToken from './middleware/persistedToken';
import checkToken from '_utils/checkToken';
import rootReducer from '_reducers';

const localStorage = compose(
  checkToken(),
)(adapter(window.localStorage));

const finalCreateStore = compose(
  applyMiddleware(api, persistedToken(localStorage), thunk),
  reduxReactRouter({ createHistory }),
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('_reducers', () => {
      const nextRootReducer = require('_reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

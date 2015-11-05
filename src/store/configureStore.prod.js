/*
* @Author: Oleg Orlov
* @Date:   2015-10-29 14:40:19
*/

import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';
import thunk from 'redux-thunk';

import adapter from '_utils/localStorage';
import api from './middleware/api';
import persistedToken from './middleware/persistedToken';
import checkToken from '_utils/checkToken';
import rootReducer from '_reducers';
import getRoutes from '../routes';

const localStorage = compose(
  checkToken(),
)(adapter(window.localStorage));

const finalCreateStore = compose(
  applyMiddleware(api, persistedToken(localStorage), thunk),
  reduxReactRouter({ getRoutes, createHistory }),
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}

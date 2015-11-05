/*
* @Author: Oleg Orlov
* @Date:   2015-07-09 15:17:19
*/

import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import auth from './auth';

export default combineReducers({
  auth,
  router,
});

/*
* @Author: Oleg Orlov
* @Date:   2015-09-22 14:00:19
*/

import * as ActionTypes from '_actions/auth';
import { refresh } from '_actions/auth';

export default (storage, key = 'tango') => () => next => {
  if (typeof storage !== 'object') throw new Error(`Storage is required`);

  storage.get(key, token => {
    if (token) {
      next({ type: ActionTypes.AUTH_REFRESH_SUCCESS, response: { token } });
      next(refresh());
    }
  });

  return action => {
    if (action.type === ActionTypes.AUTH_LOGIN_SUCCESS || action.type === ActionTypes.AUTH_REFRESH_SUCCESS) {
      storage.put(key, action.response.token);
      const resultAction = next(action);
      next(refresh());
      return resultAction;
    }

    if (action.type === ActionTypes.AUTH_REFRESH_FAIL || action.type === ActionTypes.AUTH_LOGOUT_REQUEST) {
      storage.del(key);
    }

    return next(action);
  };
};

/*
* @Author: Oleg Orlov
* @Date:   2015-07-09 15:17:19
*/

import { CALL_API } from '_store/middleware/api';
import getExpirationDelay from '_utils/getExpirationDelay';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_REFRESH_REQUEST = 'AUTH_REFRESH_REQUEST';
export const AUTH_REFRESH_SUCCESS = 'AUTH_REFRESH_SUCCESS';
export const AUTH_REFRESH_FAIL = 'AUTH_REFRESH_FAIL';
export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL';

export function login(username, password) {
  return {
    [CALL_API]: {
      types: [AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL],
      endpoint: 'auth/login',
      auth: [username, password],
    },
  };
}

function fetchRefresh() {
  return {
    [CALL_API]: {
      types: [AUTH_REFRESH_REQUEST, AUTH_REFRESH_SUCCESS, AUTH_REFRESH_FAIL],
      endpoint: 'auth/refresh',
    },
  };
}

export function refresh() {
  return (dispatch, getState) => setTimeout(() => dispatch(fetchRefresh()), getExpirationDelay(getState()));
}

export function logout() {
  return {
    [CALL_API]: {
      types: [AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAIL],
      endpoint: 'auth/logout',
    },
  };
}

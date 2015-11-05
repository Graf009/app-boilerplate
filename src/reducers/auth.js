/*
* @Author: Oleg Orlov
* @Date:   2015-07-09 15:17:19
*/

import jwt from 'jsonwebtoken';

import * as ActionTypes from '_actions/auth';

const initialState = {
  loaded: false,
  token: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.AUTH_LOGIN_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case ActionTypes.AUTH_LOGIN_SUCCESS:
  case ActionTypes.AUTH_REFRESH_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      token: action.response.token,
      user: jwt.decode(action.response.token),
    };
  case ActionTypes.AUTH_LOGIN_FAIL:
  case ActionTypes.AUTH_REFRESH_FAIL:
    return {
      ...state,
      logging: false,
      loaded: false,
      user: null,
      token: null,
      error: action.error,
    };
  case ActionTypes.AUTH_LOGOUT_REQUEST:
    return {
      ...state,
      loaded: false,
      token: null,
      user: null,
    };
  default:
    return state;
  }
}

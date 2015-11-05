/*
* @Author: Oleg Orlov
* @Date:   2015-09-18 12:11:11
*/

import superagent from 'superagent';

import config from '_config';

function getFullUrl(endpoint) {
  const adjustedEndpoint = endpoint[0] !== '/' ? '/' + endpoint : endpoint;
  return `${config.api.host}:${config.api.port}/api/${config.api.version}${adjustedEndpoint}`;
}

function getMetod(options) {
  if (options && options.data) {
    return 'post';
  }

  // return 'get';
  return 'post';
}

// function callApi(endpoint, schema) {
function callApi(endpoint, options) {
  const fullUrl = getFullUrl(endpoint);
  const metod = getMetod(options);

  return new Promise((resolve, reject) => {
    const request = superagent[metod](fullUrl);

    if (options && options.token) {
      request.set({
        Authorization: `Bearer ${options.token}`,
      });
    }

    if (options && options.auth) {
      request.auth(...options.auth);
    }

    if (options && options.params) {
      request.query(options.params);
    }

    if (options && options.data) {
      request.send(options.data);
    }

    request.end((err, res) => {
      if (err) return reject(err);
      resolve(res.body);

      // resolve(normalize(res.body, schema));
    });
  });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  // const { schema, types } = callAPI;
  const { endpoint, types, auth, data } = callAPI;
  const {auth: {token}} = store.getState();

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.');
  // }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  // return callApi(endpoint, schema).then(
  return callApi(endpoint, { auth, data, token }).then(
    response => next(actionWith({
      response,
      type: successType,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    }))
  );
};

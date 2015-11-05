/*
* @Author: Oleg Orlov
* @Date:   2015-06-24 15:17:19
*/

import React from 'react';
import { render } from 'react-dom';

import { Root } from '_containers';
import configureStore from '_store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

render(
  <Root store={store} />,
  document.getElementById('root')
);

/*
* @Author: Oleg Orlov
* @Date:   2015-10-28 17:02:19
*/

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import DevTools from '_containers/DevTools/DevTools';
import getRoutes from '_routes';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <ReduxRouter>
            { getRoutes(store) }
          </ReduxRouter>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

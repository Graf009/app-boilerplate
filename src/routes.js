/*
* @Author: Oleg Orlov
* @Date:   2015-06-24 15:17:19
*/

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { Application, RequireUser, Dashboard, Home } from '_containers';

export default function getRoutes({getState}) {
  return (
    <Route path="/" component={ Application }>
      <IndexRoute component={ Home } />
      <Route component={ RequireUser } onEnter={ RequireUser.onEnter(getState) }>
        <Route path="dashboard" component={ Dashboard } />
      </Route>
    </Route>
  );
}

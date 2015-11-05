/*
* @Author: Oleg Orlov
* @Date:   2015-08-24 12:29:19
*/

import React, { Component } from 'react';
import { Drawer, Navigation, Icon, Spacer } from 'react-mdl';

import './Drawer.css';

export default class extends Component {
  render() {
    return (
      <Drawer className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header className="drawer-header">
          <img className="avatar" />
          <span>o.orlov@plamee.com</span>
        </header>
        <Navigation className="drawer-navigation mdl-color--blue-grey-800">
          <a href=""><Icon name="assessment" className="mdl-color-text--blue-grey-400" />Report</a>
          <Spacer />
          <a href=""><Icon name="help_outline" className="mdl-color-text--blue-grey-400" /></a>
        </Navigation>
      </Drawer>
    );
  }
}

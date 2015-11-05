/**
 * Created by Oleg Orlov on 09.07.15.
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Header, Button, Navigation } from 'react-mdl';

import './Header.css';

export default class extends Component {
  static propTypes = {
    userIsLogin: PropTypes.bool.isRequired,
    onLoginButton: PropTypes.func.isRequired,
    onLogoutButton: PropTypes.func.isRequired,
  };

  render() {
    const { userIsLogin, onLoginButton, onLogoutButton } = this.props;
    return (
      <Header transparent title="Business Intelligence System">
        {!userIsLogin && <Button raised colored onClick={ onLoginButton }>LOG IN</Button>}
        {userIsLogin &&
          <Navigation className="header-navigation">
            <Link to="/dashboard">DASHBOARD</Link>
            <div onClick={ onLogoutButton }>LOG OUT</div>
          </Navigation>}
      </Header>
    );
  }
}

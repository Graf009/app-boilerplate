/*
* @Author: Oleg Orlov
* @Date:   2015-07-08 15:17:19
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Layout, Content } from 'react-mdl';
import 'material-design-lite/material.min.js';
import 'material-design-lite/material.min.css';

// import Drawer from './Drawer/Drawer';
import Header from './Header/Header';
import { DocumentTitle } from '_components';
import { Login } from '_containers';
import { logout } from '_actions/auth';
import './Application.css';

class Application extends Component {
  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    loginIsOpen: false,
  };

  handleLoginButton(event) {
    event.preventDefault();
    this.setState({loginIsOpen: true});
  }

  handleCloseModal() {
    this.setState({loginIsOpen: false});
  }

  // <Drawer />
  render() {
    const { user } = this.props;
    const { loginIsOpen } = this.state;
    const userIsLogin = !!user; // TODO:idea

    return (
      <div>
        <DocumentTitle title={__APP_VERSION__}>
          <Layout fixedHeader>
            <Login isOpen={ loginIsOpen } onRequestClose={ ::this.handleCloseModal } />
            <Header userIsLogin={ userIsLogin } onLoginButton={ ::this.handleLoginButton } onLogoutButton={ this.props.logout }/>
            <Content>
              { this.props.children }
            </Content>
          </Layout>
        </DocumentTitle>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(
  mapStateToProps, {
    logout,
  })(Application);

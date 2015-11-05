/*
* @Author: Oleg Orlov
* @Date:   2015-08-25 15:17:19
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Textfield, Button, Grid, Cell, ProgressBar } from 'react-mdl';

import changeState from '_utils/changeState';
import { login } from '_actions/auth';
import './Login.css';

Modal.setAppElement('#root');

const customModalStyles = {
  overlay: {
    backgroundColor: '',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
  },
};

class Login extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
  };

  handleClose() {
    const { onRequestClose } = this.props;

    this.setState({
      username: '',
      password: '',
    });
    onRequestClose();
  }

  handleLogin(event) {
    event.preventDefault();

    const { username, password } = this.state;

    this.props.login(username, password).then(
      ({ response }) => { if (response) this.handleClose(); }
    );
  }

  render() {
    const { isOpen, auth: { loggingIn } } = this.props;
    const { username, password } = this.state;

    return (
      <Modal isOpen={ isOpen } onRequestClose={ ::this.handleClose } style={ customModalStyles }>
        <Grid>
          <Cell col={ 12 }>
            <Textfield
              value={ username }
              onChange={ changeState(this, 'username')}
              label="Login"
              floatingLabel
              style={{width: '200px'}}
              />
          </Cell>
          <Cell col={ 12 }>
            <Textfield
              value={ password }
              type="password"
              onChange={ changeState(this, 'password')}
              label="Password"
              floatingLabel
              style={{width: '200px'}}
              />
          </Cell>
          <Cell col={ 4 }>
            <Button raised colored onClick={ ::this.handleLogin }>LOG IN</Button>
          </Cell>
          { loggingIn &&
            <Cell col={ 12 }>
              <ProgressBar indeterminate style={{width: '420px'}} />
            </Cell>}
        </Grid>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(
  mapStateToProps,
  { login }
)(Login);

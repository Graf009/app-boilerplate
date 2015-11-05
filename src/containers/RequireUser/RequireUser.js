/*
* @Author: Oleg Orlov
* @Date:   2015-10-05 13:02:19
*/

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';

class RequireUser extends Component {
  static propTypes = {
    user: PropTypes.object,
    replaceState: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
  };

  static onEnter(getState) {
    return (nextState, replaceState) => {
      const { auth: { user }} = getState();
      if (!user) replaceState('/');
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) this.props.replaceState('/');
  }

  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(
  mapStateToProps, {
    replaceState,
  })(RequireUser);

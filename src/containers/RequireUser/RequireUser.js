/*
* @Author: Oleg Orlov
* @Date:   2015-10-05 13:02:19
*/

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'redux-router/lib/actionCreators';

class RequireUser extends Component {
  static propTypes = {
    user: PropTypes.object,
    replace: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) this.props.replace('/');
  }

  static onEnter(getState) {
    return (nextState, replaceState) => {
      const { auth: { user }} = getState();
      if (!user) replaceState('/');
    };
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
    replace,
  })(RequireUser);

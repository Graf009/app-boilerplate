/**
 * Created by Oleg Orlov on 28.08.15.
 */

import React, { Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';

function reducePropsToState(propsList) {
  const innermostProps = propsList.map(props => { if (props && props.title) return props.title; });
  if (innermostProps) {
    return innermostProps;
  }
}

function handleStateChangeOnClient(titleList) {
  document.title = titleList.reverse().join(' - ');
}

class DocumentTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object,
  };

  render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    }

    return null;
  }
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);

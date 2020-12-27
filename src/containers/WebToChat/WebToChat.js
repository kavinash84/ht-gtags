import React, { Component } from 'react';
import { connect } from 'react-redux';
import WebToChatContainer from 'components/WebToChat';
import { togglePopUp, dismiss } from 'redux/modules/webtochat';
import PropTypes from 'prop-types';

@connect(
  state => ({
    webtochat: state.webtochat
  }),
  {
    toggleWebToChat: togglePopUp,
    dismissebToChat: dismiss
  }
)
export default class WebToChat extends Component {
  static propTypes = {
    dismissebToChat: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    webtochat: PropTypes.object.isRequired
  };

  static defaultProps = {
    visible: false
  };
  handleOnAccept = () => {
    const { dismissebToChat } = this.props;

    // toggleWebToChat(false);
    dismissebToChat();
    window.embedded_svc.inviteAPI.inviteButton.acceptInvite();
  };
  handleOnClose = () => {
    const { dismissebToChat } = this.props;
    dismissebToChat();
    // window.embedded_svc.inviteAPI.inviteButton.acceptInvite();
  };

  render() {
    const {
      webtochat: { visible }
    } = this.props;
    return (
      <WebToChatContainer handleOnClose={this.handleOnClose} handleOnAccept={this.handleOnAccept} visible={visible} />
    );
  }
}

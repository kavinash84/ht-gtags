import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WebToChat extends Component {
  render() {
    const { handleOnClose, handleOnAccept, visible } = this.props;
    return (
      <div>
        {visible ? (
          <div
            className="embeddedServiceInvitation"
            id="custom_snapins_invite"
            aria-live="assertive"
            role="dialog"
            aria-atomic="true"
          >
            <div
              className="embeddedServiceInvitationHeader"
              aria-labelledby="snapins_titletext"
              aria-describedby="snapins_bodytext"
            >
              <span className="embeddedServiceTitleText" id="snapins_titletext">
                Need help?
              </span>
              <button
                type="button"
                //   id="closeInvite"
                className="embeddedServiceCloseIcon"
                aria-label="Exit invitation"
                onClick={handleOnClose}
              >
                &times;
              </button>
            </div>
            <div className="embeddedServiceInvitationBody">
              <p id="snapins_bodytext">How can we help you?</p>
            </div>
            <div className="embeddedServiceInvitationFooter" aria-describedby="snapins_bodytext">
              <button
                type="button"
                className="embeddedServiceActionButton"
                //   id="rejectInvite"
                onClick={handleOnClose}
              >
                Close
              </button>
              <button
                type="button"
                className="embeddedServiceActionButton"
                //   id="acceptInvite"
                onClick={handleOnAccept}
              >
                Start Chat
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

WebToChat.propTypes = {
  handleOnClose: PropTypes.func.isRequired,
  handleOnAccept: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default WebToChat;

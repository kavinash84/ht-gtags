import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';

/**
 * Page Components
 */
import ForgotPasswordForm from 'components/ForgotPasswordForm';
import ResponsiveModal from 'components/Modal';

/**
 * helpers / modules
 */
import { LOGIN_URL } from 'helpers/Constants';
import { validateEmail } from 'js-utility-functions';
import { forgotPassword } from 'redux/modules/forgotpassword';

@connect(({ forgotpassword }) => ({
  response: forgotpassword
}))
@withRouter
export default class ForgotPasswordModal extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: ''
    };
  }

  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = validateEmail(value, 'Enter valid email');
    this.setState({
      email: value,
      emailError: checkError.error,
      emailErrorMessage: checkError.error ? checkError.errorMessage : ''
    });
  };

  onSubmitForgot = e => {
    e.preventDefault();
    const { email } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    if (checkEmail.error) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage
      });
    }
    const { dispatch } = this.context.store;
    dispatch(forgotPassword(email));
  };

  render() {
    const { email, emailError, emailErrorMessage } = this.state;
    const { response, showForgotPasswordModal, onCloseModal } = this.props;

    return (
      <ResponsiveModal
        classNames={{ modal: 'forgotPasswordModal' }}
        onCloseModal={onCloseModal}
        open={showForgotPasswordModal}
      >
        <Box pb={30}>
          <ForgotPasswordForm
            email={email}
            onChangeEmail={this.onChangeEmail}
            emailFeedBackError={emailError}
            emailFeedBackMessage={emailErrorMessage}
            onSubmitForgot={this.onSubmitForgot}
            forgotResponse={response}
            loginUrl={LOGIN_URL}
          />
        </Box>
      </ResponsiveModal>
    );
  }
}

ForgotPasswordModal.propTypes = {
  showForgotPasswordModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

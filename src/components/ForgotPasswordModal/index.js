import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/**
 * Page Components
 */
import ForgotPasswordForm from 'components/ForgotPasswordForm';
import ResponsiveModal from 'components/Modal';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
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
      emailErrorMessage: '',
      submitted: false
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
    this.setState({ submitted: true });
    const { dispatch } = this.context.store;
    dispatch(forgotPassword(email));
    // setTimeout(() => {
    //   this.props.onCloseModal();
    // }, 2500);
  };

  render() {
    const {
 email, emailError, emailErrorMessage, submitted
} = this.state;
    const { response, showForgotPasswordModal, onCloseModal } = this.props;
    const { loaded, error } = response;
    return (
      <ResponsiveModal
        classNames={{ modal: 'forgotPasswordModal' }}
        onCloseModal={onCloseModal}
        open={showForgotPasswordModal}
      >
        {loaded && !error && submitted ? (
          <Box sx={{ textAlign: 'center' }} py={20}>
            <Image src="https://static.hometown.in/media/cms/extras-desktop/forgot-password-icon.png" alt="" height={150} mb={30} />
            <Box>
              <Text mb={5}>An email has been sent to</Text>
              <Text mb={15}>
                <b>{email}</b>
              </Text>
              <Text>Please follow the instructions to reset your password</Text>
            </Box>
          </Box>
        ) : (
          <ForgotPasswordForm
            email={email}
            onChangeEmail={this.onChangeEmail}
            emailFeedBackError={emailError}
            emailFeedBackMessage={emailErrorMessage}
            onSubmitForgot={this.onSubmitForgot}
            forgotResponse={response}
            loginUrl={LOGIN_URL}
          />
        )}
      </ResponsiveModal>
    );
  }
}

ForgotPasswordModal.propTypes = {
  showForgotPasswordModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

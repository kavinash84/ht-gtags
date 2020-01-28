import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Components
 */
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/**
 * Page Components
 */
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import LoginFormWrapper from 'hometown-components-dev/lib/FormsHtV1/LoginFormHtV1';
import ResponsiveModal from 'components/Modal';

/**
 * utility / modules / helper / validation
 */
import { validateEmail, isBlank } from 'js-utility-functions';
import { validateMobile, isEmpty, checkSpecialChar } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { login, clearLoginState } from 'redux/modules/login';
import { SIGNUP_URL, FORGOT_PASSWORD_URL } from 'helpers/Constants';

/**
 * Icons
 */
const LoaderIcon = require('../../../static/refresh-black.svg');

@connect(state => ({
  loginResponse: state.userLogin
}))
export default class LoginForm extends Component {
  static propTypes = {
    loginResponse: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    }).isRequired,
    askContact: PropTypes.bool.isRequired,
    askName: PropTypes.bool.isRequired,
    loginType: PropTypes.string.isRequired,
    loggingIn: PropTypes.bool.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    email: '',
    emailError: false,
    emailErrorMessage: '',
    password: '',
    passwordError: false,
    passwordErrorMessage: '',
    phone: '',
    phoneError: false,
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
    name: '',
    nameError: false,
    nameErrorMessage: 'Please enter a name without special characters'
  };

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
  onChangePassword = e => {
    const {
      target: { value }
    } = e;
    const checkError = isBlank(value);
    this.setState({
      password: value,
      passwordError: checkError,
      passwordErrorMessage: checkError ? "Password can't be blank" : ''
    });
  };
  onSubmitLogin = e => {
    e.preventDefault();
    const {
 email, password, phone, name
} = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const checkMobile = phone ? !validateMobile(phone) : false;
    const checkName = !isEmpty(name) ? checkSpecialChar(name) : false;
    const checkPassword = isBlank(password);
    if (checkEmail.error || checkPassword || checkMobile || checkName) {
      return this.setState({
        nameError: checkName,
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        passwordError: checkPassword,
        passwordErrorMessage: checkPassword ? "Password can't be blank" : ''
      });
    }
    const { dispatch } = this.context.store;
    dispatch(login(this.state));
  };
  onChangePhone = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateMobile(value);
    if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      phone: value,
      phoneError: checkError,
      phoneErrorMessage:
        value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangeName = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value) || checkSpecialChar(value);
    this.setState({
      name: value,
      nameError: checkError
    });
  };
  isValid = () => {
    const { askContact, askName } = this.props;
    const { phone, name } = this.state;
    const isInvalidPhone = askContact && !validateMobile(phone);
    const isInvalidName = askName && (isEmpty(name) || checkSpecialChar(name));
    const disabled = isInvalidPhone || isInvalidName;
    return disabled;
  };
  handleModal = () => {
    const { dispatch } = this.context.store;
    dispatch(clearLoginState());
  };
  render() {
    const {
      email,
      password,
      emailError,
      emailErrorMessage,
      passwordError,
      passwordErrorMessage,
      phone,
      phoneError,
      phoneErrorMessage,
      name,
      nameError,
      nameErrorMessage
    } = this.state;
    const {
 loginResponse, askContact, loginType, askName, loggingIn
} = this.props;
    const open = (askContact || askName) && loginType && loginType === 'hometown';
    const isValidField = this.isValid();
    return (
      <Box>
        <LoginFormWrapper
          email={email}
          onChangeEmail={this.onChangeEmail}
          emailFeedBackError={emailError}
          emailFeedBackMessage={emailErrorMessage}
          password={password}
          onChangePassword={this.onChangePassword}
          passwordFeedBackError={passwordError}
          passwordFeedBackMessage={passwordErrorMessage}
          onSubmitLogin={this.onSubmitLogin}
          loginResponse={loginResponse}
          signupUrl={SIGNUP_URL}
          forgotUrl={FORGOT_PASSWORD_URL}
        />
        <ResponsiveModal classNames={{ modal: 'updateProfileModal' }} onCloseModal={this.handleModal} open={open}>
          <Row display="block" mr="0" ml="0" mb="10px">
            <Box textAlign="center">
              <Heading
                color="color676767"
                mt="0"
                mb="0"
                fontWeight="400"
                fontSize="26px"
                ta="center"
                fontFamily="light"
              >
                Update Profile
              </Heading>
              <Text color="color676767" ta="center">
                {/* eslint-disable */}
                {askName && askContact
                  ? 'Please update your contact number and name!'
                  : askName
                  ? 'Please update your name !'
                  : askContact
                  ? 'Please update your contact number!'
                  : ''}
              </Text>
            </Box>
          </Row>
          <Box textAlign="center">
            <Text textAlign="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
              <form
                onSubmit={this.onSubmitLogin}
                id="custom_form"
                name="custom_form"
                encType="multipart/form-data"
                className="bulk-order-form"
              >
                {askName && (
                  <FormInput
                    label=""
                    type="text"
                    placeholder="Enter your name"
                    onChange={this.onChangeName}
                    value={name}
                    feedBackError={nameError}
                    feedBackMessage={nameErrorMessage}
                  />
                )}
                {askContact && (
                  <FormInput
                    label=""
                    type="text"
                    placeholder="Enter your contact number!"
                    onChange={this.onChangePhone}
                    value={phone}
                    feedBackError={phoneError}
                    feedBackMessage={phoneErrorMessage}
                  />
                )}
              </form>
              <button
                style={isValidField ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
                disabled={isValidField}
                className="google-login-btn"
                onClick={e => {
                  console.log('ok');
                  this.onSubmitLogin(e);
                }}
              >
                {loggingIn ? (
                  <span>
                    Please Wait
                    <Image className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                  </span>
                ) : (
                  'Update'
                )}
              </button>
            </Text>
          </Box>
        </ResponsiveModal>
      </Box>
    );
  }
}

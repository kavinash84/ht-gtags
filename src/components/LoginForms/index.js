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
import ForgotPasswordModal from 'components/ForgotPasswordModal';

/**
 * utility / modules / helper / validation
 */
import { validateEmail, isBlank } from 'js-utility-functions';
import { validateMobile, isEmpty, checkSpecialChar, validateName, validateDob } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { login, clearLoginState } from 'redux/modules/login';
import { SIGNUP_URL } from 'helpers/Constants';

/**
 * Icons
 */
const LoaderIcon = require('../../../static/refresh-black.svg');

@connect(state => ({
  loginResponse: state.userLogin,
  askBirthDate: state.userLogin.askBirthDate,
}))
export default class LoginForm extends Component {
  static propTypes = {
    loginResponse: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    }).isRequired,
    askContact: PropTypes.bool.isRequired,
    askBirthDate: PropTypes.bool,
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
    dob: '',
    dobError: false,
    dobErrorMessage: 'Enter Valid Date',
    name: '',
    nameError: false,
    nameErrorMessage: 'Please enter a name without special characters',
    showForgotPasswordModal: false
  };

  onForgotPasswordClick = () => {
    this.setState({ showForgotPasswordModal: !this.state.showForgotPasswordModal });
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
  onSubmitLogin = (e, skipBirthdateCheck = false) => {
    e.preventDefault();
    const {
 email, password, phone, name, dob
} = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const checkMobile = phone ? !validateMobile(phone) : false;
    const checkDob = dob ? validateDob(dob).error : false;
    const checkName = !isEmpty(name) ? checkSpecialChar(name) : false;
    const checkPassword = isBlank(password);
    if (checkEmail.error || checkPassword || checkMobile || checkName || checkDob) {
      return this.setState({
        nameError: checkName,
        nameErrorMessage: validateName(name).msg,
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        passwordError: checkPassword,
        passwordErrorMessage: checkPassword ? "Password can't be blank" : '',
        dobError: checkDob,
        dobErrorMessage: checkDob ? "Date of birth can't be blank" : ''
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipBirthdateCheck
    };
    dispatch(login(data));
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
  onChangeDob = value => {
    const checkError = validateDob(value).error;

    this.setState({
      dob: value,
      dobError: checkError,
      dobErrorMessage: validateDob(value).msg
    });
  };
  onSubmitDob = () => {
    const { dob } = this.state;
    const isInvalid = validateDob(dob).error;
    if (isInvalid) {
      return this.setState({
        nameError: true,
        nameErrorMessage: validateDob(dob).msg
      });
    }
    const { dispatch } = this.context.store;
    dispatch(login(this.state));
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
  
  handleModal = () => {
    const { dispatch } = this.context.store;
    dispatch(clearLoginState());
  };
  isValid = () => {
    const { askContact, askName, askBirthDate } = this.props;
    const { phone, name, dob } = this.state;
    const isInvalidPhone = askContact && !validateMobile(phone);
    const isInvalidName = askName && (isEmpty(name) || checkSpecialChar(name));
    const isInvalidDob = askBirthDate && validateDob(dob).error;
    const disabled = isInvalidPhone || isInvalidName || isInvalidDob;
    return disabled;
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
      dob,
      dobError,
      dobErrorMessage,
      name,
      nameError,
      nameErrorMessage
    } = this.state;
    const {
 loginResponse, askContact, loginType, askName, loggingIn, askBirthDate
} = this.props;
    const open = (askContact || askName || askBirthDate) && loginType && loginType === 'hometown';
    const isValidField = this.isValid();
    return (
      <Box p={24}>
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
          onForgotPasswordClick={this.onForgotPasswordClick}
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
                  : askBirthDate
                  ? 'Please update your date of birth!'
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
                {askBirthDate && (
                  <FormInput
                    label=""
                    type="text"
                    placeholder="Enter your date of birth!"
                    onChange={this.onChangeDob}
                    value={dob}
                    feedBackError={dobError}
                    feedBackMessage={dobErrorMessage}
                  />
                )}
              </form>
              <button
                style={isValidField ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
                disabled={isValidField}
                className="google-login-btn"
                onClick={e => {
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
        <ForgotPasswordModal
          showForgotPasswordModal={this.state.showForgotPasswordModal}
          onCloseModal={this.onForgotPasswordClick}
        />
      </Box>
    );
  }
}

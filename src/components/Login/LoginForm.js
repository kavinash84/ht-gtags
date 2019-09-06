import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from 'hometown-components/lib/Forms/LoginForm';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import ResponsiveModal from 'components/Modal';
import { validateEmail, isBlank } from 'js-utility-functions';
import { validateMobile } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { login, clearLoginState } from 'redux/modules/login';
import { SIGNUP_URL, FORGOT_PASSWORD_URL } from 'helpers/Constants';

const LoaderIcon = require('../../../static/refresh-black.svg');

@connect(state => ({
  loginResponse: state.userLogin
}))
export default class LoginFormContainer extends Component {
  static propTypes = {
    loginResponse: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    }).isRequired,
    askContact: PropTypes.bool.isRequired,
    loginType: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
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
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number'
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
    const { email, password, phone } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const checkMobile = phone ? !validateMobile(phone) : false;
    const checkPassword = isBlank(password);
    if (checkEmail.error || checkPassword || checkMobile) {
      return this.setState({
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
  isValid = () => {
    const value = this.state.phone;
    const valid = !validateMobile(value);
    return valid;
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
      phoneErrorMessage
    } = this.state;
    const {
      loginResponse, askContact, loginType, loading
    } = this.props;
    const open = askContact && loginType && loginType === 'hometown';
    return (
      <div>
        <LoginForm
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
        <ResponsiveModal onCloseModal={this.handleModal} open={open}>
          <Row display="block" mr="0" ml="0" mb="10px">
            <Div col="12" ta="center">
              <Heading
                color="color676767"
                mt="0"
                mb="0"
                fontWeight="400"
                fontSize="26px"
                ta="center"
                fontFamily="light"
              >
                {'Update Profile'}
              </Heading>
              <Text color="color676767" ta="center">
                {'Mobile number is required to login'}
              </Text>
            </Div>
          </Row>
          <Div ta="center">
            <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
              <form
                onSubmit={this.onSubmitForm}
                id="custom_form"
                name="custom_form"
                encType="multipart/form-data"
                className="bulk-order-form"
              >
                <FormInput
                  label=""
                  type="text"
                  placeholder=""
                  onChange={this.onChangePhone}
                  value={phone}
                  feedBackError={phoneError}
                  feedBackMessage={phoneErrorMessage}
                />
              </form>
              <button
                style={{ backgroundColor: '#f98d29' }}
                disabled={this.isValid()}
                className="google-login-btn"
                onClick={this.onSubmitLogin}
              >
                {loading ? (
                  <span>
                    Please Wait
                    <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                  </span>
                ) : (
                  'Update Contact Number'
                )}
              </button>
            </Text>
          </Div>
        </ResponsiveModal>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/* ====== Modules ====== */

import { signUp } from 'redux/modules/signUp';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';
import { LOGIN_URL } from 'helpers/Constants';

/* ====== Validations ====== */
import { validateMobile, validatePassword, validateEmail, isEmpty, checkSpecialChar } from 'utils/validation';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ColHtV1 from 'hometown-components-dev/lib/ColHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
// import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';

import SignUpFormHtV1 from 'hometown-components-dev/lib/FormsHtV1/SignUpFormHtV1';

/* ====== Page Components ====== */
import LoginForm from 'newComponents/LoginForms/LoginForm';
import GoogleLoginBtn from 'newComponents/LoginForms/GoogleLogin';
import LoginViaOtp from 'newComponents/LoginForms/LoginViaOtp';

const OTPIcon = require('../../../static/otp.svg');
const EmailIcon = require('../../../static/email-primary.svg');

@connect(({ userSignUp, app }) => ({
  loading: userSignUp.loading,
  session: app.sessionId
}))
@withRouter
export default class SignupFormContainer extends Component {
  static propTypes = {
    session: PropTypes.string.isRequired,
    loading: PropTypes.bool
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    loading: false
  };
  constructor() {
    super();
    this.state = {
      name: '',
      nameError: false,
      nameErrorMessage: 'Special Characters Not Allowed !',
      email: '',
      emailError: false,
      emailErrorMessage: 'Enter Valid Email Id',
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
      password: '',
      passwordError: false,
      passwordErrorMessage: 'Password must contain atleast 6 and max 15 characters'
    };
  }
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
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
        value[0] === '0' ? 'Mobile number must not start with 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangePassword = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePassword(value);
    if (!allowNChar(value, 15)) {
      return;
    }
    this.setState({
      password: value,
      passwordError: checkError.error
    });
  };
  onSubmitSignup = e => {
    e.preventDefault();
    const {
      target: { action }
    } = e;
    const isRedirect = action ? action.indexOf('redirect') !== -1 : false;
    const signupOrigin = isRedirect ? 'Top Nav' : 'Pop-up';
    const {
 name, email, password, phone
} = this.state;
    const checkName = isEmpty(name) || checkSpecialChar(name);
    const checkEmail = !validateEmail(email);
    const checkPhone = phone ? !validateMobile(phone) : false;
    const checkPassword = validatePassword(password);
    if (checkName || checkEmail || checkPassword.error || checkPhone) {
      return this.setState({
        nameError: checkName,
        emailError: checkEmail,
        phoneError: checkPhone,
        passwordError: checkPassword.error
      });
    }
    const { dispatch } = this.context.store;
    const { session } = this.props;
    dispatch(signUp(this.state, session, signupOrigin));
  };
  render() {
    const {
      name,
      nameError,
      nameErrorMessage,
      email,
      phone,
      password,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      passwordError,
      passwordErrorMessage
    } = this.state;
    const { loading } = this.props;

    return (
      <BoxHtV1>
        <RowHtV1>
          <ColHtV1 variant="col-4">
            <BoxHtV1>
              <HeadingHtV1
                color="#1b2125"
                mt="0"
                mb="0"
                fontWeight="700"
                fontSize="23px"
                ta="center"
                fontFamily="HelveticaNeue"
              >
                SIGN IN
              </HeadingHtV1>
            </BoxHtV1>
            <BoxHtV1>
              <hr
                sx={{
                  color: '#000000',
                  backgroundColor: '#000000',
                  height: 0.5,
                  borderColor: '#000000',
                  mx: '0',
                  width: '100%'
                }}
              />
            </BoxHtV1>
            <BoxHtV1>
              <TextHtV1 fontSize="10px"> *Register</TextHtV1>
            </BoxHtV1>
            <RowHtV1 display="block" mr="0" ml="0" pb="0" mt=".4em">
              <BoxHtV1 mt="0.675rem" variant="col-12" ta="center" px="0">
                {!this.state.loginviaotp ? (
                  <LoginForm />
                ) : (
                  <LoginViaOtp
                    onChangeMobile={this.onChangeMobile}
                    onChangeOtp={this.onChangeOtp}
                    onSubmitMobileNumber={this.onSubmitMobileNumber}
                    onSubmitOtp={this.onSubmitOtp}
                  />
                )}
              </BoxHtV1>
            </RowHtV1>
            <RowHtV1 display="block" mr="0" ml="0" pt="1.25rem">
              <BoxHtV1 variant="col-12" ta="center" mb="0.625rem" textAlign="center">
                <LabelHtV1 fontFamily="regular" ta="center" color="color79716c" fontSize="12px" va="middle">
                  Or continue with
                </LabelHtV1>
              </BoxHtV1>
              <BoxHtV1 variant="col-6" ta="center" mb="0" pr="0.625rem">
                <ButtonHtV1
                  btnType="custom"
                  fontFamily="regular"
                  ta="center"
                  color="black"
                  mr="0.3125rem"
                  p=".375rem .75rem"
                  fontSize="0.825rem"
                  va="middle"
                  size="block"
                  height="42px"
                  width="100%"
                  bg="#FFF"
                  font="400 0.825rem system-ui"
                  onClick={this.toggleLoginForm}
                  sx={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#e6e6e6'
                  }}
                >
                  {!this.state.loginviaotp ? (
                    <ImageHtV1
                      display="inline-block"
                      src={OTPIcon}
                      alt="OTP Login"
                      va="sub"
                      width="18px"
                      mr="0.625rem"
                    />
                  ) : (
                    <ImageHtV1
                      display="inline-block"
                      src={EmailIcon}
                      alt="OTP Login"
                      va="sub"
                      width="18px"
                      mr="0.625rem"
                    />
                  )}
                  {!this.state.loginviaotp ? 'OTP Login' : 'Email'}
                </ButtonHtV1>
              </BoxHtV1>
              <BoxHtV1 variant="col-6" ta="center" mb="0" pl="0.625rem">
                <GoogleLoginBtn loading={loading} />
              </BoxHtV1>
            </RowHtV1>
          </ColHtV1>
          <ColHtV1 variant="col-8">
            <BoxHtV1>
              <RowHtV1>
                <ColHtV1 variant="col-12" ta="center">
                  <BoxHtV1 variant="col-12" ta="center" px="0">
                    <HeadingHtV1
                      color="#1b2125"
                      mt="0"
                      mb="0"
                      fontWeight="700"
                      fontSize="23px"
                      ta="center"
                      fontFamily="HelveticaNeue"
                    >
                      CREATE AN ACCOUNT
                    </HeadingHtV1>
                  </BoxHtV1>
                  <BoxHtV1 variant="col-12" ta="center" px="0">
                    <hr
                      sx={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: 0.5,
                        borderColor: '#000000',
                        mx: '0',
                        width: '100%'
                      }}
                    />
                  </BoxHtV1>
                  <TextHtV1 fontSize="10px"> *Register</TextHtV1>
                </ColHtV1>
              </RowHtV1>
              <RowHtV1 mt="1em">
                <ColHtV1 variant="col-6" ta="center">
                  <SignUpFormHtV1
                    email={email}
                    onChangeEmail={this.onChangeEmail}
                    emailFeedBackError={emailError}
                    emailFeedBackMessage={emailErrorMessage}
                    name={name}
                    onChangeName={this.onChangeName}
                    nameFeedBackError={nameError}
                    nameFeedBackMessage={nameErrorMessage}
                    phone={phone}
                    onChangePhone={this.onChangePhone}
                    phoneFeedBackError={phoneError}
                    phoneFeedBackMessage={phoneErrorMessage}
                    password={password}
                    onChangePassword={this.onChangePassword}
                    passwordFeedBackError={passwordError}
                    passwordFeedBackMessage={passwordErrorMessage}
                    onSubmitSignup={this.onSubmitSignup}
                    loading={loading}
                    loginUrl={LOGIN_URL}
                  />
                </ColHtV1>
              </RowHtV1>
              <RowHtV1>
                <ColHtV1>
                  {/* <BoxHtV1>
                    <Label>
                      <Checkbox
                        id="remember"
                        name="remember"
                      />
                      I have read and agree to <TextHtV1>HomeTown Policy.</TextHtV1>
                    </Label>
                  </BoxHtV1> */}
                  <ButtonHtV1 px="2.5em" mt="2em">
                    Register
                  </ButtonHtV1>
                </ColHtV1>
              </RowHtV1>
            </BoxHtV1>
          </ColHtV1>
        </RowHtV1>
      </BoxHtV1>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

/* ====== Modules ====== */
import { login, getOtp, resendOtp, birthdateCheck, clearLoginState } from 'redux/modules/login';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';

/* ====== Validations ====== */
// import { validateMobile, isEmpty, checkSpecialChar } from 'utils/validation';
import { validateMobile, validateName, validateEmail, validateDob, isEmpty, checkSpecialChar } from 'utils/validation';
import { FORGOT_PASSWORD_URL, SIGNUP_URL } from 'helpers/Constants';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
// import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';

/* ====== Page Components ====== */
// import LoginForm from 'components/LoginForms';
import LoginForm from 'hometown-components-dev/lib/FormsHtV1/LoginFormHtV1';
import GoogleLoginBtn from 'components/LoginForms/GoogleLogin';
import LoginViaOtp from 'components/LoginForms/LoginViaOtp';
import UpdateProfileModal from './UpdateProfile';

// const styles = require('./index.scss');
const LoaderIcon = require('../../../static/refresh.svg');
const OTPIcon = require('../../../static/otp.svg');
const EmailIcon = require('../../../static/email-primary.svg');

@connect(state => ({
  loginResponse: state.userLogin,
  router: state.router,
  getotpError: state.userLogin.otpError,
  getotpErrorMessage: state.userLogin.errorMessage,
  otpSent: state.userLogin.otpSent,
  loaded: state.userLogin.loaded,
  loading: state.userLogin.loading,
  loggingIn: state.userLogin.loggingIn,
  askContact: state.userLogin.askContact,
  askBirthDate: state.userLogin.askBirthDate,
  askEmail: state.userLogin.askEmail,
  askName: state.userLogin.askName,
  skipBirthdateCheck: state.userLogin.skipBirthdateCheck,
  loginType: state.userLogin.loginType
}))
export default class LoginFormContainer extends Component {
  static propTypes = {
    loginResponse: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    }).isRequired,
    getotpError: PropTypes.bool,
    getotpErrorMessage: PropTypes.string,
    otpSent: PropTypes.bool,
    loading: PropTypes.bool,
    loginType: PropTypes.string,
    loaded: PropTypes.bool,
    loggingIn: PropTypes.bool,
    askContact: PropTypes.bool,
    askBirthDate: PropTypes.bool,
    skipBirthdateCheck: PropTypes.bool,
    askEmail: PropTypes.bool,
    askName: PropTypes.bool
    // onChangeDob: PropTypes.func,
    // dob: PropTypes.string,
    // dobError: PropTypes.string,
    // dobErrorMessage: PropTypes.string
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    otpSent: false,
    getotpError: false,
    getotpErrorMessage: '',
    loaded: false,
    loading: false,
    loggingIn: false,
    askContact: false,
    askBirthDate: false,
    skipBirthdateCheck: false,
    askEmail: false,
    askName: false,
    loginType: ''
  };

  state = {
    loginviaotp: false,
    mobile: '',
    phone: '',
    phoneError: false,
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
    otp: '',
    otpError: false,
    name: '',
    nameError: false,
    nameErrorMessage: 'Enter a valid name, without special characters !',
    otpErrorMessage: 'OTP Should be 6 Characters',
    email: '',
    emailError: false,
    emailErrorMessage: 'Please Enter Valid Email ',
    dob: '',
    dobError: false,
    dobErrorMessage: 'Enter Valid Date',
    mobilesubmitted: false,
    resend: false,
    password: '',
    passwordError: '',
    passwordErrorMessage: ''
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.mobilesubmitted && nextProps.getotpError && nextProps.getotpErrorMessage.includes('resend')) {
      this.setState({
        mobilesubmitted: true
      });
    }
    if (nextProps.otpSent && nextProps.otpSent !== this.props.otpSent) {
      this.setState({
        mobilesubmitted: true
      });
    }
  }
  onChangeMobile = e => {
    const { value } = e.target;
    const checkError = !validateMobile(value);
    if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      mobile: value,
      mobileError: checkError,
      mobileErrorMessage:
        value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangeOtp = e => {
    const { value } = e.target;
    if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      otp: value,
      otpError: false
    });
  };
  onChangeName = e => {
    const { value } = e.target;
    const nameCheck = isEmpty(value) || checkSpecialChar(value);
    if (nameCheck) {
      return;
    }
    this.setState({
      name: value,
      nameError: false
    });
  };

  onChangeEmail = e => {
    const { value } = e.target;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
    });
  };
  onSubmitMobileNumber = e => {
    e.preventDefault();
    const { mobile, resend } = this.state;
    const checkmobile = !validateMobile(mobile);
    if (checkmobile) {
      return this.setState({
        mobileError: true,
        mobileErrorMessage: 'Please Enter Valid Mobile Number'
      });
    }
    const { dispatch } = this.context.store;
    if (resend) {
      return dispatch(resendOtp(this.state.mobile));
    }
    dispatch(getOtp(this.state.mobile));
  };
  onSubmitOtp = e => {
    e.preventDefault();
    const { otp } = this.state;
    if (otp.length < 6) {
      return this.setState({
        nameError: true
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
    dispatch(login(data));
  };
  onSubmitName = e => {
    e.preventDefault();
    const { name } = this.state;
    const isInvalid = isEmpty(name) || checkSpecialChar(name);
    if (isInvalid) {
      return this.setState({
        nameError: true
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
    dispatch(login(data));
  };

  // Same code is being repeated ?
  onSubmitName = e => {
    e.preventDefault();
    const { name } = this.state;
    const isInvalid = isEmpty(name) || checkSpecialChar(name);
    if (isInvalid) {
      return this.setState({
        nameError: true
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
    dispatch(login(data));
  };
  onSubmitNameAndEmail = e => {
    e.preventDefault();
    const { name, email } = this.state;
    const checkEmail = !validateEmail(email);
    const checkName = validateName(name).error;
    if (checkName) {
      return this.setState({
        nameError: true,
        nameErrorMessage: validateName(name).msg
      });
    }

    if (checkEmail) {
      return this.setState({ emailError: checkEmail });
    }

    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
    dispatch(login(data));
  };

  onSubmitEmail = e => {
    e.preventDefault();
    const { email } = this.state;
    const checkEmail = !validateEmail(email);

    if (checkEmail) {
      return this.setState({ emailError: checkEmail });
    }

    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
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
    // const value = '1995-10-02';
    const checkError = validateDob(value).error;
    const newDob = new Date(value);
    const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
    const myAge = Math.floor((Date.now(currentDate) - newDob) / 31557600000);
    // this.setState({
    //   dob: value,
    //   dobError: checkError,
    //   dobErrorMessage: validateDob(value).msg
    // });
    if (myAge > 10) {
      this.setState({
        dob: value,
        dobError: checkError
      });
    } else {
      this.setState({
        dob: value,
        dobError: true,
        dobErrorMessage: 'Wallet user can not be less than 10 years old'
      });
    }
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
    const data = {
      ...this.state,
      skipOtpValidation: true,
      dob: moment(dob).format('YYYY-MM-DD')
    };
    dispatch(login(data));
  };
  onSkipDob = () => {
    this.birthdateChecker(true);
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipBirthdateCheck: true,
      skipOtpValidation: true,
      dob: ''
    };
    dispatch(login(data));
  };
  onChangePassword = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
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

    const checkEmail = !validateEmail(email, 'Invalid Email');
    const checkMobile = phone ? !validateMobile(phone) : false;
    const checkDob = dob ? validateDob(dob).error : false;
    const checkName = !isEmpty(name) ? validateName(name) : false;
    const checkPassword = isEmpty(password);
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
      skipBirthdateCheck,
      skipOtpValidation: false,
      dob: dob ? moment(dob).format('YYYY-MM-DD') : ''
    };
    dispatch(login(data));
  };
  birthdateChecker = status => {
    const { dispatch } = this.context.store;
    dispatch(birthdateCheck(status));
  };
  toggleLoginForm = () => {
    const { dispatch } = this.context.store;
    this.setState({
      loginviaotp: !this.state.loginviaotp,
      resend: false,
      mobilesubmitted: false,
      email: '',
      password: '',
      otp: '',
      otpError: false
    });
    dispatch(clearLoginState());
  };
  handleResend = () => {
    this.setState({
      mobilesubmitted: false,
      resend: true
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
    const isInvalidName = askName && validateName(name).error;
    const isInvalidDob = askBirthDate && validateDob(dob).error;
    const disabled = isInvalidPhone || isInvalidName || isInvalidDob;
    return disabled;
  };

  render() {
    const {
      mobile,
      mobileError,
      mobileErrorMessage,
      phone,
      phoneError,
      phoneErrorMessage,
      otp,
      name,
      nameError,
      nameErrorMessage,
      otpError,
      otpErrorMessage,
      mobilesubmitted,
      email,
      emailError,
      emailErrorMessage,
      resend,
      dob,
      dobError,
      dobErrorMessage,
      password,
      passwordError,
      passwordErrorMessage
    } = this.state;
    const {
      loaded,
      loading,
      loggingIn,
      askContact,
      askName,
      loginType,
      askEmail,
      askBirthDate,
      skipBirthdateCheck,
      loginResponse
    } = this.props;
    const open = (askContact || askName || askBirthDate) && loginType && loginType === 'hometown';
    const isValidField = this.isValid();
    return (
      <Row>
        <Box variant="col-4">
          <Box width={1} mb={10} sx={{ borderBottom: 'divider' }}>
            <Heading color="#1b2125" pb={20}>
              {!this.state.loginviaotp ? 'SIGN IN' : 'LOGIN VIA OTP'}
            </Heading>
          </Box>
          <Box pb={20}>
            <Text fontSize={12}>*Required</Text>
          </Box>
          <Box>
            {!this.state.loginviaotp ? (
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
                  forgotUrl={FORGOT_PASSWORD_URL}
                  signupUrl={SIGNUP_URL}
                />
                <UpdateProfileModal
                  askName={askName}
                  askContact={askContact}
                  askBirthDate={askBirthDate}
                  skipBirthdateCheck={skipBirthdateCheck}
                  open={open}
                  name={name}
                  nameError={nameError}
                  nameErrorMessage={nameErrorMessage}
                  phone={phone}
                  phoneError={phoneError}
                  phoneErrorMessage={phoneErrorMessage}
                  dob={dob}
                  dobError={dobError}
                  dobErrorMessage={dobErrorMessage}
                  isValidField={isValidField}
                  loggingIn={loggingIn}
                  LoaderIcon={LoaderIcon}
                  handleModal={this.handleModal}
                  onSubmitLogin={this.onSubmitLogin}
                  onChangeName={this.onChangeName}
                  onChangePhone={this.onChangePhone}
                  onChangeDob={this.onChangeDob}
                  birthdateCheck={this.birthdateChecker}
                />
              </div>
            ) : (
              <LoginViaOtp
                onChangeMobile={this.onChangeMobile}
                onChangeOtp={this.onChangeOtp}
                onChangeDob={this.onChangeDob}
                onSubmitDob={this.onSubmitDob}
                onSubmitMobileNumber={this.onSubmitMobileNumber}
                onSubmitOtp={this.onSubmitOtp}
                otp={otp}
                onSkipDob={this.onSkipDob}
                otpError={otpError}
                otpErrorMessage={otpErrorMessage}
                onChangeName={this.onChangeName}
                onSubmitName={this.onSubmitName}
                name={name}
                nameError={nameError}
                nameErrorMessage={nameErrorMessage}
                mobile={mobile}
                mobileError={mobileError}
                mobileErrorMessage={mobileErrorMessage}
                mobilesubmitted={mobilesubmitted}
                loaded={loaded}
                loading={loading}
                loggingIn={loggingIn}
                handleResend={this.handleResend}
                resend={resend}
                askName={askName}
                dob={dob}
                dobError={dobError}
                dobErrorMessage={dobErrorMessage}
                onSubmitNameAndEmail={this.onSubmitNameAndEmail}
                onSubmitEmail={this.onSubmitEmail}
                email={email}
                emailError={emailError}
                emailErrorMessage={emailErrorMessage}
                askEmail={askEmail}
                onChangeEmail={this.onChangeEmail}
                askBirthDate={askBirthDate}
                skipBirthdateCheck={skipBirthdateCheck}
              />
            )}
          </Box>
          <Row mx={0} pt={40}>
            <Box variant="col-12" textAlign="center" mb={16}>
              <Label color="textLight" fontSize={16}>
                Or Continue with
              </Label>
            </Box>
            <Box variant="col-6" px={5}>
              <Button
                onClick={this.toggleLoginForm}
                variant="outline.secondary"
                height={42}
                justifyContent="center"
                alignItems="center"
                display="flex"
                width={1}
                sx={{
                  border: 'divider',
                  borderRadius: 3
                }}
              >
                {!this.state.loginviaotp ? (
                  <Image src={OTPIcon} alt="OTP Login" width={18} mr={10} />
                ) : (
                  <Image src={EmailIcon} alt="Email Login" width={18} mr={10} />
                )}
                {!this.state.loginviaotp ? 'OTP Login' : 'Email'}
              </Button>
            </Box>
            <Box variant="col-6" px={5}>
              <GoogleLoginBtn
                askContact={askContact}
                loginType={loginType}
                askName={askName}
                loading={loading}
                loggingIn={loggingIn}
                askBirthDate={askBirthDate}
              />
            </Box>
          </Row>
        </Box>
        <Box variant="col-8" pl={40}>
          <Box
            width={1}
            mb={20}
            sx={{
              borderBottom: 'divider'
            }}
          >
            <Heading color="#1b2125" pb={20}>
              CREATE AN ACCOUNT
            </Heading>
          </Box>
          <Heading fontSize={16}>If you don't yet have HomeTown account, please register.</Heading>
          <Button px={80} mt={30} height={42} lineHeight={1.7} fontWeight={600} as={Link} to={SIGNUP_URL}>
            Register
          </Button>
        </Box>
      </Row>
    );
  }
}

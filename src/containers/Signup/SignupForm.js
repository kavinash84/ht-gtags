import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router';
import DatePicker from 'components/Form/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';

/* ====== Modules ====== */

import { signUp } from 'redux/modules/signUp';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';
import { LOGIN_URL } from 'helpers/Constants';

/* ====== Validations ====== */
import {
  validateMobile,
  validatePassword,
  validateEmail,
  isEmpty,
  checkSpecialChar,
  checkDateOfBirth,
  validateDob
} from 'utils/validation';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
// import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/* ====== Page Components ====== */
import GoogleLoginBtn from 'components/LoginForms/GoogleLogin';
import LoginForm from 'components/LoginForms';
import LoginViaOtp from 'components/LoginForms/LoginViaOtp';
import SignUpForm from 'hometown-components-dev/lib/FormsHtV1/SignUpFormHtV1';

import './Signdatepicker.css';
import CreateWalletModal from './createWalletModal';
import { validateName } from '../../utils/validation';

const OTPIcon = require('../../../static/otp.svg');
const EmailIcon = require('../../../static/email-primary.svg');

// const validateDate = dob => {
//   if (dob) return false;
//   return true;
// };

const showDateField = (dob, onChange) => (
  <DatePicker
    selected={dob}
    onChange={onChange}
    maxDate={new Date()}
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
  />
);

@connect(({ userSignUp, app }) => ({
  loading: userSignUp.loading,
  session: app.sessionId,
  signUpResponse: userSignUp
}))
@withRouter
export default class SignupFormContainer extends Component {
  static propTypes = {
    session: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    signUpResponse: PropTypes.object.isRequired
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
      nameErrorMessage: 'Numbers and special characters are not allowed ! Sign Up Form',
      email: '',
      emailError: false,
      emailErrorMessage: 'Enter Valid Email Id',
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
      password: '',
      passwordError: false,
      passwordErrorMessage: 'Password must contain atleast 6 and max 15 characters',
      dob: '',
      dobError: false,
      dobErrorMessage: 'Invalid date of birth',
      gender: '',
      genderError: false,
      genderErrorMessage: 'global err message',
      city: '',
      cityError: false,
      cityErrorMessage: 'global err message',
      policyAccepted: false,
      showModal: false
    };
  }
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value) || !validateEmail(value);
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
      nameError: checkError,
      nameErrorMessage: checkSpecialChar(value)
        ? 'Numbers and special characters are not allowed !'
        : 'Name Cannot be Left Empty !'
    });
  };
  onChangePhone = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value) || !validateMobile(value);
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
  onChangeGender = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      gender: value
    });
  };
  onChangeCity = e => {
    const {
      target: { value }
    } = e;
    const checkError = checkSpecialChar(value);
    this.setState({
      city: value,
      cityError: checkError,
      cityErrorMessage: 'Numbers and special characters are not allowed !'
    });
  };
  onChangeDob = value => {
    const checkError = value && validateDob(value);
    this.setState({
      dob: value,
      dobError: checkError
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
  onChangePolicy = e => {
    e.preventDefault();
    // const {
    //   target: { value }
    // } = e;
    this.setState({ policyAccepted: !this.state.policyAccepted });
  };
  onSubmitSignup = otp => {
    // e.preventDefault();
    // const {
    //   target: { action }
    // } = e;
    // const isRedirect = action ? action.indexOf('redirect') !== -1 : false;
    // const signupOrigin = isRedirect ? 'Top Nav' : 'Pop-up';
    const {
      name,
      email,
      password,
      phone,
      city,
      dob
      //  gender,
    } = this.state;
    const checkName = isEmpty(name) || checkSpecialChar(name);
    const checkEmail = !validateEmail(email);
    const checkPhone = isEmpty(phone) || !validateMobile(phone);
    const checkPassword = validatePassword(password);
    const checkCity = checkSpecialChar(city);
    const checkDob = checkDateOfBirth(dob);
    if (checkName || checkEmail || checkPassword.error || checkPhone || checkDob) {
      return this.setState({
        nameError: checkName,
        nameErrorMessage: checkSpecialChar(name)
          ? 'Numbers and special characters are not allowed !'
          : 'Name Cannot be Left Empty !',
        emailError: checkEmail,
        phoneError: checkPhone,
        passwordError: checkPassword.error,
        cityError: checkCity,
        dobError: checkDob
      });
    }
    const dobValue = moment(dob).format('YYYY-MM-DD');
    let data = {};
    if (otp) {
      data = {
        ...this.state,
        dob: dobValue,
        otp
      };
    } else {
      data = {
        ...this.state,
        dob: dobValue
      };
    }
    const { dispatch } = this.context.store;
    const { session } = this.props;
    dispatch(signUp(data, session));
  };

  preOnsubmitSignup = e => {
    e.preventDefault();
    const {
 name, email, password, phone, dob
} = this.state;
    const checkName = validateName(name).error;
    const checkEmail = !validateEmail(email);
    const checkPhone = !validateMobile(phone);
    const checkPassword = validatePassword(password);
    const checkDob = validateDob(dob);

    if (checkName || checkEmail || checkPassword.error || checkPhone || checkDob) {
      return this.setState({
        nameError: checkName,
        emailError: checkEmail,
        phoneError: checkPhone,
        passwordError: checkPassword.error,
        nameErrorMessage: validateName(name).msg,
        dobError: checkDob
      });
    }
    this.handleModal();
  };

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleYes = otp => {
    this.onSubmitSignup(otp);
  };

  toggleLoginForm = () => {
    this.setState({
      loginviaotp: !this.state.loginviaotp,
      resend: false,
      mobilesubmitted: false
    });
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
      passwordErrorMessage,
      dob,
      dobError,
      dobErrorMessage,
      gender,
      genderError,
      genderErrorMessage,
      city,
      cityError,
      cityErrorMessage,
      policyAccepted
    } = this.state;
    const { loading, signUpResponse } = this.props;
    return (
      <Row>
        <Col variant="col-4">
          <Box mb={10} sx={{ borderBottom: 'divider' }}>
            <Heading color="#1b2125" pb={20}>
              SIGN IN
            </Heading>
          </Box>
          <Box pb={20}>
            <Text fontSize={12}>*Required</Text>
          </Box>
          <Box pb={40}>
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
          </Box>
          <Row mx={0}>
            <Box variant="col-12" textAlign="center" mb={16}>
              <Label color="textLight" fontSize={15}>
                Or Continue with
              </Label>
            </Box>
            <Box variant="col-6">
              <Button
                variant="outline.secondary"
                onClick={this.toggleLoginForm}
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
                  <Image src={EmailIcon} alt="OTP Login" width={18} mr={10} />
                )}
                {!this.state.loginviaotp ? 'OTP Login' : 'Email'}
              </Button>
            </Box>
            <Box variant="col-6">
              <GoogleLoginBtn loading={loading} />
            </Box>
          </Row>
        </Col>
        <Box variant="col-8" pl={40}>
          <Box mb={10} sx={{ borderBottom: 'divider' }}>
            <Heading color="#1b2125" pb={20}>
              CREATE AN ACCOUNT
            </Heading>
          </Box>
          <Box pb={20}>
            <Text fontSize={12}>*Required</Text>
          </Box>
          <Row>
            <Col width={1}>
              <SignUpForm
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
                onSubmitSignup={this.preOnsubmitSignup}
                signUpResponse={signUpResponse}
                loginUrl={LOGIN_URL}
                phonemandatory
                date={showDateField(dob, this.onChangeDob)}
                // dobFeedBackMessage={dobErrorMessage}
                // dobFeedBackError={dobError}
                dobFeedBackError={dobError}
                dobFeedBackMessage={dobErrorMessage}
                gender={gender}
                genderFeedBackError={genderError}
                genderFeedBackMessage={genderErrorMessage}
                city={city}
                cityFeedBackError={cityError}
                cityFeedBackMessage={cityErrorMessage}
                onChangeGender={this.onChangeGender}
                onChangeCity={this.onChangeCity}
                // onChangeDob={this.onChangeDob}
                onChangePolicy={this.onChangePolicy}
                policyAccepted={policyAccepted}
                loading={loading}
                // date={<DatePicker/>}
                // date={showDateField(dob, this.onChangeDob)}
              />
            </Col>
          </Row>
        </Box>
        <CreateWalletModal
          showModal={this.state.showModal}
          handleModal={this.handleModal}
          handleNo={this.onSubmitSignup}
          handleYes={this.handleYes}
          mobile={phone}
        />
      </Row>
    );
  }
}

/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResponsiveModal from 'components/Modal';
import GoogleLoginBtn from 'react-google-login';
import moment from 'moment';

/* ====== Validations ====== */
import { validateMobile, validateName } from 'utils/validation';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';

/* ====== Modules ====== */
import { googleLogin, clearLoginState, birthdateCheck, resendOtpfromSignUp, resendOtp } from 'redux/modules/login';
// import { linkFuturePay } from 'redux/modules/profile';

/* ====== Components ====== */
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

import UpdateName from './UpdateName';
import UpdateContacts from './UpdateContacts';
// import UpdateDob from './UpdateDobGoogle';
// import UpdateContactAndDob from './UpdateContactAndDob';

const LoaderIcon = require('../../../static/refresh-black.svg');

const mapStateToProps = ({ app, userLogin }) => ({
  session: app.sessionId,
  userLogin: app.userLogin
  // skipBirthdateCheck: userLogin.skipBirthdateCheck
});

const onSuccess = (dispatcher, session, phone) => result => {
  dispatcher(result, session, phone, null, null, false, null, true);
};

const onError = error => e => {
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginViaLogin: googleLogin,
      clearLogin: clearLoginState
    },
    dispatch
  );

const GoogleIcon = require('../../../static/google.svg');

class GoogleLogin extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
      firstName: '',
      firstNameError: false,
      firstNameErrorMessage: 'Please enter a valid first name',
      lastName: '',
      lastNameError: false,
      lastNameErrorMessage: 'Please enter a valid last name',
      otp: '',
      otpErrorMessage: 'OTP Should be 6 Characters',
      resend: false,
      mobilesubmitted: false,
      // open: false,
      resendtimer: 30
    };
  }

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

  componentDidUpdate(nextProps, prevState) {
    if (this.state.mobilesubmitted && this.state.mobilesubmitted !== prevState.mobilesubmitted) {
      const timerref = setInterval(() => {
        if (this.state.resendtimer <= 1) {
          clearInterval(this.state.timerref);
        }
        this.setState(prevstate => ({
          resendtimer: prevstate.resendtimer - 1
        }));
      }, 1000);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ timerref });
    }
  }

  onSubmitMobileNumber = e => {
    e.preventDefault();
    const { phone, resend, dob } = this.state;
    const checkmobile = !validateMobile(phone);
    const { session, loginViaLogin } = this.props;

    if (checkmobile) {
      return this.setState({
        phoneError: true,
        phoneErrorMessage: 'Please Enter Valid Mobile Number'
      });
    }
    const { dispatch } = this.context.store;
    if (resend) {
      return dispatch(resendOtp(this.state.phone));
    }

    loginViaLogin({}, session, phone, null, dob, true, null, false);
    this.setState({
      mobilesubmitted: true
    });
  };

  onSubmitMobileAndDob = e => {
    e.preventDefault();
    const {
 phone, resend, otp
} = this.state;
    const checkmobile = !validateMobile(phone);
    const { session, loginViaLogin } = this.props;
    const { dispatch } = this.context.store;

    if (checkmobile) {
      return this.setState({
        phoneError: true,
        phoneErrorMessage: 'Please Enter Valid Mobile Number'
      });
    }
    if (resend) {
      return dispatch(resendOtpfromSignUp(this.state.phone));
    }

    loginViaLogin({}, session, phone, null, false, otp, true);
    this.setState({
      mobilesubmitted: true
    });
    // dispatch(linkFuturePay({ skipOtpValidation: true }));
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

  onChangeFirstName = e => {
    const {
      target: { value }
    } = e;

    let isInvalid = validateName(value).error;
    isInvalid = !isInvalid ? value.includes('customer') : true;
    // if (isInvalid) {
    return this.setState({
      firstName: value,
      firstNameError: isInvalid
    });
    // }
  };
  onChangeLastName = e => {
    const {
      target: { value }
    } = e;

    let isInvalid = validateName(value).error;
    isInvalid = !isInvalid ? value.includes('customer') : true;
    this.setState({
      lastName: value,
      lastNameError: isInvalid
    });
  };
  // onChangeDob = value => {
  //   const checkError = validateDob(value).error;
  //   const newDob = moment(value, 'DD-MM-YYYY').toDate();
  //   const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
  //   const myAge = Math.floor((Date.now(currentDate) - newDob) / 31557600000);
  //   if (myAge > 10) {
  //     this.setState({
  //       dob: value,
  //       dobError: checkError,
  //       dobErrorMessage: validateDob(value).msg
  //     });
  //   } else {
  //     this.setState({ dobError: true, dobErrorMessage: 'Wallet user should be atleast 10 years old' });
  //   }
  // };
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
  onSubmitOtp = e => {
    e.preventDefault();
    const { otp } = this.state;
    if (otp.length < 6) {
      return this.setState({
        otpError: true
      });
    }
    // dispatch(linkFuturePay({ skipOtpValidation: true }));
    // dispatch(this.props.loginViaLogin({}, session, phone, null ,dob, skipBirthdateCheck, otp, true));
    // dispatch(loadUserProfile());
  };
  handleResend = () => {
    this.setState({
      // mobilesubmitted: false,
      resend: true
    });
    const { dispatch } = this.context.store;
    const { phone } = this.state;
    dispatch(resendOtp(phone));
  };
  // birthdateCheck = status => {
  //   const { dispatch } = this.context.store;
  //   dispatch(birthdateCheck(status));
  // };

  handleModal = () => {
    this.props.clearLogin();
  };
  isValid = () => {
    const value = this.state.phone;
    const valid = !validateMobile(value);
    return valid;
  };
  render() {
    const {
      loginViaLogin,
      session,
      askContact,
      askName,
      // askBirthDate,
      loginType,
      loggingIn
      // skipBirthdateCheck
    } = this.props;
    const {
      // eslint-disable-next-line max-len
      phone,
      phoneError,
      phoneErrorMessage,
      firstName,
      firstNameError,
      firstNameErrorMessage,
      lastName,
      lastNameError,
      lastNameErrorMessage,
      // dob,
      // dobError,
      // dobErrorMessage,
      mobilesubmitted,
      otp,
      otpError,
      otpErrorMessage,
      resend,
      resendtimer
    } = this.state;
    const open = (askContact || askName ) && loginType && loginType === 'google';
    return (
      <Box>
        <Box
          as={GoogleLoginBtn}
          clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
          onSuccess={onSuccess(loginViaLogin, session)}
          onFailure={onError}
          variant="outline.secondary"
          height={42}
          width={1}
          alignItems="center"
          display="flex"
          justifyContent="center"
          color="#7a7d7d"
          fontSize={14}
          fontWeight={500}
          sx={{
            border: 'divider',
            borderRadius: 3,
            cursor: 'pointer'
          }}
        >
          <Image src={GoogleIcon} alt="Google" width={18} mr={10} />
          GOOGLE
        </Box>
        <ResponsiveModal classNames={{ modal: 'updateProfileModal' }} onCloseModal={this.handleModal} open={open}>
          {/* <Row>
            <Box variant="col-12">
              <Heading>Update Profile</Heading>
              <Text>Mobile number is required to login</Text> */}
          {askName && askContact ? (
            <UpdateContacts
              session={session}
              loggingIn={loggingIn}
              LoaderIcon={LoaderIcon}
              firstName={firstName}
              firstNameError={firstNameError}
              firstNameErrorMessage={firstNameErrorMessage}
              lastName={lastName}
              lastNameError={lastNameError}
              lastNameErrorMessage={lastNameErrorMessage}
              phone={phone}
              phoneError={phoneError}
              phoneErrorMessage={phoneErrorMessage}
              onChangeFirstName={this.onChangeFirstName}
              onChangeLastName={this.onChangeLastName}
              onChangePhone={this.onChangePhone}
              loginViaLogin={loginViaLogin}
            />
          ) 
          // : askContact && askBirthDate ? (
          //   <UpdateContactAndDob
          //     session={session}
          //     loggingIn={loggingIn}
          //     phone={phone}
          //     phoneError={phoneError}
          //     phoneErrorMessage={phoneErrorMessage}
          //     onChangePhone={this.onChangePhone}
          //     dob={dob}
          //     dobError={dobError}
          //     dobErrorMessage={dobErrorMessage}
          //     onChangeDob={this.onChangeDob}
          //     onSubmitMobileNumber={this.onSubmitMobileNumber}
          //     onSubmitMobileAndDob={this.onSubmitMobileAndDob}
          //     mobilesubmitted={mobilesubmitted}
          //     LoaderIcon={LoaderIcon}
          //     skipBirthdateCheck={skipBirthdateCheck}
          //     birthdateCheck={this.birthdateCheck}
          //     loginViaLogin={loginViaLogin}
          //     onSubmitOtp={this.onSubmitOtp}
          //     onChangeOtp={this.onChangeOtp}
          //     otp={otp}
          //     otpError={otpError}
          //     otpErrorMessage={otpErrorMessage}
          //     resend={resend}
          //     resendtimer={resendtimer}
          //     handleResend={this.handleModal}
          //   />
          // ) 
          : askName ? (
            <UpdateName
              session={session}
              loggingIn={loggingIn}
              LoaderIcon={LoaderIcon}
              firstName={firstName}
              firstNameError={firstNameError}
              firstNameErrorMessage={firstNameErrorMessage}
              lastName={lastName}
              lastNameError={lastNameError}
              lastNameErrorMessage={lastNameErrorMessage}
              onChangeFirstName={this.onChangeFirstName}
              onChangeLastName={this.onChangeLastName}
              loginViaLogin={loginViaLogin}
              // onSubmitForm={this.onSubmitForm}
            />
          )
          //  : askBirthDate ? (
          //   <UpdateDob
          //     session={session}
          //     loggingIn={loggingIn}
          //     dob={dob}
          //     dobError={dobError}
          //     dobErrorMessage={dobErrorMessage}
          //     onChangeDob={this.onChangeDob}
          //     LoaderIcon={LoaderIcon}
          //     skipBirthdateCheck={skipBirthdateCheck}
          //     birthdateCheck={this.birthdateCheck}
          //     loginViaLogin={loginViaLogin}
          //   />
          // )
           : askContact ? (
            <Box>
              <Row>
                <Box variant="col-12">
                  <Heading>{'Update Profile'}</Heading>
                  <Text mt={15} mb={10}>
                    {'Mobile number is required to login'}
                  </Text>
                </Box>
              </Row>
              <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
                <form
                  onSubmit={this.onSubmitForm}
                  id="custom_form"
                  name="custom_form"
                  encType="multipart/form-data"
                  className="bulk-order-form"
                >
                  <FormInputHtV1
                    label=""
                    type="text"
                    placeholder=""
                    onChange={this.onChangePhone}
                    value={phone}
                    feedBackError={phoneError}
                    feedBackMessage={phoneErrorMessage}
                  />
                </form>
                {/* <GoogleLoginBtn
                  disabled={this.isValid()}
                  className="google-login-btn"
                  clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
                  onSuccess={onSuccess(loginViaLogin, session, phone)}
                  onFailure={onError}
                > */}
                <button
                  disabled={this.isValid()}
                  className="google-login-btn"
                  onClick={e => {
                    e.preventDefault();
                    loginViaLogin({}, session, phone);
                  }}
                >
                  {loggingIn ? (
                    <span>
                      Please Wait
                      <Image className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                    </span>
                  ) : (
                    'Update Contact Number'
                  )}
                  {/* </GoogleLoginBtn> */}
                </button>
              </Text>
            </Box>
          ) : null}
        </ResponsiveModal>
      </Box>
    );
  }
}

GoogleLogin.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  clearLogin: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
  askContact: PropTypes.bool.isRequired,
  askName: PropTypes.bool.isRequired,
  loginType: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  // askBirthDate: PropTypes.bool.isRequired,
  // skipBirthdateCheck: PropTypes.bool.isRequired,
  getotpError: PropTypes.bool.isRequired,
  getotpErrorMessage: PropTypes.string.isRequired,
  otpSent: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);

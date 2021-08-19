/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResponsiveModal from 'components/Modal';
import GoogleLoginBtn from 'react-google-login';

/* ====== Validations ====== */
// import { validateMobile } from 'utils/validation';
import { validateMobile, validateName, validateDob } from 'utils/validation';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';

/* ====== Modules ====== */
import { googleLogin, clearLoginState, resendOtp } from 'redux/modules/login';

/* ====== Components ====== */
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

import UpdateName from './UpdateName';
import UpdateContacts from './UpdateContacts';
import UpdateDob from './UpdateDob';
import UpdateContactAndDob from './UpdateContactAndDob';

const LoaderIcon = require('../../../static/refresh-black.svg');

const mapStateToProps = ({ app }) => ({
  session: app.sessionId,
  userLogin: app.userLogin
});

const onSuccess = (dispatcher, session, phone) => result => {
  dispatcher(result.tokenId, session, phone);
};
const onError = error => e => {
  // console.log('Error occuried');
  console.log(error, e);
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
      open: false,
      resendtimer: 30
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextProps');
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
    const { session, skipBirthdateCheck } = this.props;
    console.log(checkmobile, phone, 'check');
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
    // dispatch(getOtp(this.state.phone));
    // dispatch(linkFuturePay({ skipOtpValidation: true }));
    dispatch(this.props.loginViaLogin({}, session, phone, null, dob, skipBirthdateCheck, null, true));
    console.log('mobile submit');
    this.setState({
      mobilesubmitted: true
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
  onChangeDob = () => {
    console.log('Onchange dob');
    const value = '1995-10-02';
    const checkError = !validateDob(value).error;

    this.setState({
      dob: value,
      dobError: checkError,
      dobErrorMessage: validateDob(value).msg
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
  onSubmitOtp = e => {
    e.preventDefault();
    const { otp, phone, dob } = this.state;
    const { session, skipBirthdateCheck } = this.props;
    if (otp.length < 6) {
      return this.setState({
        otpError: true
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
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
  birthdateCheck = status => {
    const { dispatch } = this.context.store;
    dispatch(birthdateCheck(status));
  };
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
      loginType,
      loggingIn,
      askBirthDate,
      skipBirthdateCheck
    } = this.props;
    // const { phone, phoneError, phoneErrorMessage } = this.state;
    // const open = askContact && loginType && loginType === 'google';
    const {
      // eslint-disable-next-line max-len
      dob,
      dobError,
      dobErrorMessage,
      phone,
      phoneError,
      phoneErrorMessage,
      firstName,
      firstNameError,
      firstNameErrorMessage,
      lastName,
      lastNameError,
      lastNameErrorMessage,
      mobilesubmitted,
      otp,
      otpError,
      otpErrorMessage,
      resend,
      resendtimer
    } = this.state;
    const open = (askContact || askName || askBirthDate) && loginType && loginType === 'google';

    return (
      <Box>
        <GoogleLoginBtn
          className="socialBtn"
          clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
          onSuccess={onSuccess(loginViaLogin, session)}
          onFailure={onError}
        >
          <Image display="inline-block" src={GoogleIcon} alt="Google" va="sub" width="18px" mr="10px" />
          GOOGLE
        </GoogleLoginBtn>
        <ResponsiveModal
          classNames={{ overlay: 'bulkOrderOverlayModal', modal: 'updateProfileModal' }}
          onCloseModal={this.handleModal}
          open={open}
        >
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
          ) : askContact && askBirthDate ? (
            <UpdateContactAndDob
              session={session}
              loggingIn={loggingIn}
              phone={phone}
              phoneError={phoneError}
              phoneErrorMessage={phoneErrorMessage}
              onChangePhone={this.onChangePhone}
              dob={dob}
              dobError={dobError}
              dobErrorMessage={dobErrorMessage}
              onChangeDob={this.onChangeDob}
              onSubmitMobileNumber={this.onSubmitMobileNumber}
              mobilesubmitted={mobilesubmitted}
              LoaderIcon={LoaderIcon}
              skipBirthdateCheck={skipBirthdateCheck}
              birthdateCheck={this.birthdateCheck}
              loginViaLogin={loginViaLogin}
              onSubmitOtp={this.onSubmitOtp}
              onChangeOtp={this.onChangeOtp}
              otp={otp}
              otpError={otpError}
              otpErrorMessage={otpErrorMessage}
              resend={resend}
              resendtimer={resendtimer}
              handleResend={this.handleModal}
            />
          ) : askName ? (
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
          ) : askBirthDate ? (
            <UpdateDob
              session={session}
              loggingIn={loggingIn}
              dob={dob}
              dobError={dobError}
              dobErrorMessage={dobErrorMessage}
              onChangeDob={this.onChangeDob}
              loginViaLogin={loginViaLogin}
            />
          ) : askContact ? (
            <Box>
              <Row>
                <Box variant="col-12">
                  <Heading>{'Update Profile'}</Heading>
                  <Text>{'Mobile number is required to login'}</Text>
                </Box>
              </Row>
              <Text>
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
                {/* <button
                  disabled={this.isValid()}
                  className="google-login-btn"
                  onClick={e => {
                    e.preventDefault();
                    loginViaLogin({}, session, phone);
                  }}
                > */}
                <GoogleLoginBtn
                  disabled={this.isValid()}
                  className="google-login-btn"
                  clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
                  onSuccess={onSuccess(loginViaLogin, session, phone)}
                  onFailure={onError}
                >
                  {loggingIn ? (
                    <span>
                      Please Wait
                      <Image className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                    </span>
                  ) : (
                    'Update Contact Number'
                  )}
                </GoogleLoginBtn>
              </Text>
            </Box>
          ) : // </Row>
          // <Text>
          //   <form
          //     onSubmit={this.onSubmitForm}
          //     id="custom_form"
          //     name="custom_form"
          //     encType="multipart/form-data"
          //     className="bulk-order-form"
          //   >
          //     <FormInputHtV1
          //       label=""
          //       type="text"
          //       placeholder=""
          //       onChange={this.onChangePhone}
          //       value={phone}
          //       feedBackError={phoneError}
          //       feedBackMessage={phoneErrorMessage}
          //     />
          //   </form>
          //   <button
          //     disabled={this.isValid()}
          //     className="google-login-btn"
          //     onClick={e => {
          //       e.preventDefault();
          //       loginViaLogin({}, session, phone);
          //     }}
          //   >
          //     {loggingIn ? (
          //       <span>
          //         Please Wait
          //         <Image className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
          //       </span>
          //     ) : (
          //       'Update Contact Number'
          //     )}
          //   </button>
          // </Text>
          null}
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
  askBirthDate: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);

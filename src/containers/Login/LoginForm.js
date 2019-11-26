import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

/* ====== Modules ====== */
import { login, getOtp, resendOtp } from 'redux/modules/login';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';

/* ====== Validations ====== */
import { validateMobile } from 'utils/validation';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import RowHtV1 from 'hometown-components/lib/RowHtV1';
import TextHtV1 from 'hometown-components/lib/TextHtV1';
import ImageHtV1 from 'hometown-components/lib/ImageHtV1';
import ButtonHtV1 from 'hometown-components/lib/ButtonHtV1';
import LabelHtV1 from 'hometown-components/lib/LabelHtV1';
import HeadingHtV1 from 'hometown-components/lib/HeadingHtV1';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';

/* ====== Page Components ====== */
import LoginForm from 'newComponents/LoginForms/LoginForm';
import GoogleLoginBtn from 'newComponents/LoginForms/GoogleLogin';
import LoginViaOtp from 'newComponents/LoginForms/LoginViaOtp';

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
  loginType: state.userLogin.loginType
}))
export default class LoginFormContainer extends Component {
  static propTypes = {
    getotpError: PropTypes.bool,
    getotpErrorMessage: PropTypes.string,
    otpSent: PropTypes.bool,
    loading: PropTypes.bool,
    askContact: PropTypes.bool,
    loginType: PropTypes.string,
    loaded: PropTypes.bool.isRequired,
    loggingIn: PropTypes.bool.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    otpSent: false,
    getotpError: false,
    getotpErrorMessage: '',
    loading: false,
    askContact: false,
    loginType: ''
  };

  state = {
    loginviaotp: false,
    mobile: '',
    otp: '',
    otpErrorMessage: 'OTP Should be 6 Characters',
    mobilesubmitted: false,
    resend: false
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
        otpError: true
      });
    }
    const { dispatch } = this.context.store;
    dispatch(login(this.state));
  };
  handleResend = () => {
    this.setState({
      mobilesubmitted: false,
      resend: true
    });
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
      mobile,
      mobileError,
      mobileErrorMessage,
      otp,
      otpError,
      otpErrorMessage,
      mobilesubmitted,
      resend
    } = this.state;
    const {
      loaded, loading, loggingIn, askContact, loginType
    } = this.props;

    return (
      <BoxHtV1>
        <RowHtV1 display="block" mr="0" ml="0">
          <BoxHtV1 variant="col-5">
            <ImageShimmer
              src="https://static.hometown.in/media/cms/hometownnew/compressed/signup-sidebar-bg.jpg"
              height="520px"
            >
              {imageURL => <ImageHtV1 height="520px" src={imageURL} alt="" />}
            </ImageShimmer>
          </BoxHtV1>
          <BoxHtV1 variant="col-7" p="1.5rem 2.5rem 0.5rem 2.5rem">
            <RowHtV1>
              <RowHtV1 display="block" mt="rem" mr="0" ml="0">
                <BoxHtV1 variant="col-12" ta="center">
                  <HeadingHtV1
                    color="color676767"
                    mt="0"
                    mb="0"
                    fontWeight="400"
                    fontSize="26px"
                    ta="center"
                    fontFamily="light"
                  >
                    Sign in to your account
                  </HeadingHtV1>
                  <TextHtV1 color="color676767" ta="center">
                    To track your orders, manage your account and more.
                  </TextHtV1>
                </BoxHtV1>
              </RowHtV1>
              <RowHtV1 display="block" mr="0" ml="0" pb="0">
                <BoxHtV1 mt="0.675rem">
                  {!this.state.loginviaotp ? (
                    <LoginForm askContact={askContact} loginType={loginType} loading={loading} />
                  ) : (
                    <LoginViaOtp
                      onChangeMobile={this.onChangeMobile}
                      onChangeOtp={this.onChangeOtp}
                      onSubmitMobileNumber={this.onSubmitMobileNumber}
                      onSubmitOtp={this.onSubmitOtp}
                      otp={otp}
                      otpError={otpError}
                      otpErrorMessage={otpErrorMessage}
                      mobile={mobile}
                      mobileError={mobileError}
                      mobileErrorMessage={mobileErrorMessage}
                      mobilesubmitted={mobilesubmitted}
                      loaded={loaded}
                      loading={loading}
                      loggingIn={loggingIn}
                      handleResend={this.handleResend}
                      resend={resend}
                    />
                  )}
                </BoxHtV1>
              </RowHtV1>
              <RowHtV1 display="block" mr="0" ml="0" pt="1.25rem">
                <BoxHtV1 variant="col-12" ta="center" mb="0.625rem">
                  <LabelHtV1 fontFamily="regular" ta="center" color="color79716c" fontSize="1rem" va="middle">
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
                    fontSize="0.825rem"
                    va="middle"
                    border="1px solid #e6e6e6"
                    size="block"
                    height="42px"
                    bg="#FFF"
                    onClick={this.toggleLoginForm}
                  >
                    {!this.state.loginviaotp ? (
                      <ImageHtV1 display="inline-block" src={OTPIcon} alt="OTP" va="sub" width="18px" mr="10px" />
                    ) : (
                      <ImageHtV1 display="inline-block" src={EmailIcon} alt="OTP" va="sub" width="18px" mr="10px" />
                    )}
                    {!this.state.loginviaotp ? 'OTP' : 'Login Via Email Id'}
                  </ButtonHtV1>
                </BoxHtV1>
                <BoxHtV1 variant="col-6" ta="center" mb="0" pl="0.625rem">
                  <GoogleLoginBtn askContact={askContact} loginType={loginType} loading={loading} />
                </BoxHtV1>
              </RowHtV1>
            </RowHtV1>
            {/* <RowHtV1 display="block" mr="0" ml="0" pt="0.3125rem">
              <BoxHtV1 variant="col-12">
                <LabelHtV1 fontFamily="medium" color="error" display="block" ta="center">
                  Message
                </LabelHtV1>
              </BoxHtV1>
            </RowHtV1> */}
          </BoxHtV1>
        </RowHtV1>
      </BoxHtV1>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

/* ====== Modules ====== */
import { login, getOtp, resendOtp } from 'redux/modules/login';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';

/* ====== Validations ====== */
import { validateMobile } from 'utils/validation';
import { SIGNUP_URL } from 'helpers/Constants';

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
import LoginForm from 'newComponents/LoginForms';
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
      <Row padding="58px">
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
          </Box>
          <Row mx={0} pt={40}>
            <Box variant="col-12" textAlign="center" mb={16}>
              <Label color="textLight" fontSize={15}>
                Or Continue with
              </Label>
            </Box>
            <Box variant="col-6">
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
            <Box variant="col-6">
              <GoogleLoginBtn askContact={askContact} loginType={loginType} loading={loading} />
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
          <Heading fontSize={14}>If you don't yet have HomeTown account, please register.</Heading>
          <Button px={80} mt={30} height={42} lineHeight={1.7} fontWeight={600} as={Link} to={SIGNUP_URL}>
            Register
          </Button>
        </Box>
      </Row>
    );
  }
}

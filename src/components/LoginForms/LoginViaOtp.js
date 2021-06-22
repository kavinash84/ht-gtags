/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';

export default class LoginViaOtp extends React.Component {
  state = {
    resendtimer: 30,
    timerref: null
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.mobilesubmitted && nextProps.mobilesubmitted !== this.props.mobilesubmitted) {
      const timerref = setInterval(() => {
        if (this.state.resendtimer <= 1) {
          clearInterval(this.state.timerref);
        }
        this.setState(prevstate => ({
          resendtimer: prevstate.resendtimer - 1
        }));
      }, 1000);
      this.setState({ timerref });
    }
  }
  componentWillUnmount() {
    const { timerref } = this.state;
    if (timerref) {
      clearInterval(timerref);
    }
  }
  render() {
    const {
      mobile,
      mobileError,
      mobileErrorMessage,
      otp,
      otpError,
      otpErrorMessage,
      mobilesubmitted,
      loading,
      loggingIn,
      resend,
      askName,
      askEmail,
      email,
      emailError,
      emailErrorMessage,
      name,
      nameError,
      nameErrorMessage
    } = this.props;
    const {
      onSubmitMobileNumber,
      onSubmitOtp,
      onChangeMobile,
      onChangeOtp,
      handleResend,
      onChangeName,
      onSubmitName,
      onChangeEmail,
      onSubmitEmail,
      onSubmitNameAndEmail
    } = this.props;
    const { resendtimer } = this.state;

    return (
      <Box>
        {!mobilesubmitted ? (
          <form onSubmit={onSubmitMobileNumber}>
            <FormInputHtV1
              label="Phone no.*"
              onChange={onChangeMobile}
              value={mobile}
              type="text"
              placeholder="Enter your 10 digits number"
              feedBackError={mobileError}
              feedBackMessage={mobileErrorMessage}
              fontSize="16px"
            />
            <Flex justifyContent="center">
              <Button width={180} height={42} fontWeight={600} onClick={this.onSubmitMobileNumber} disabled={loading}>
                GET OTP
              </Button>
            </Flex>
          </form>
        ) : askName && askEmail ? (
          <form onSubmit={onSubmitNameAndEmail}>
            <FormInput
              label="Name"
              onChange={onChangeName}
              value={name}
              type="text"
              placeholder="Please enter your name"
              feedBackError={nameError}
              feedBackMessage={nameErrorMessage}
            />
            <FormInput
              label="Email"
              onChange={onChangeEmail}
              value={email}
              type="text"
              placeholder="Please enter your email"
              feedBackError={emailError}
              feedBackMessage={emailErrorMessage}
            />
            <Button
              btnType="primary"
              size="block"
              boder="solid 1px rgba(151,151,151,0.47)"
              fontFamily="regular"
              height="38px"
              mt="0"
              ml="-1px"
              onClick={this.onSubmitNameAndEmail}
              disabled={loggingIn}
            >
              {loggingIn ? 'Please Wait..' : 'Update & Login'}
            </Button>
          </form>
        ) : askName ? (
          <form onSubmit={onSubmitName}>
            <FormInputHtV1
              label="Name"
              onChange={onChangeName}
              value={name}
              type="text"
              placeholder="Please enter your name"
              feedBackError={nameError}
              feedBackMessage={nameErrorMessage}
            />
            <Button width={180} height={42} fontWeight={600} onClick={this.onSubmitName} disabled={loggingIn}>
              {loggingIn ? 'Please Wait..' : 'Update & Login'}
            </Button>
          </form>
        ) : askEmail ? (
          <form onSubmit={onSubmitEmail}>
            <FormInput
              label="Email"
              onChange={onChangeEmail}
              value={email}
              type="text"
              placeholder="Please enter your email"
              feedBackError={emailError}
              feedBackMessage={emailErrorMessage}
            />
            <Button
              btnType="primary"
              size="block"
              boder="solid 1px rgba(151,151,151,0.47)"
              fontFamily="regular"
              height="38px"
              mt="0"
              ml="-1px"
              onClick={this.onSubmitEmail}
              disabled={loggingIn}
            >
              {loggingIn ? 'Please Wait..' : 'Update & Login'}
            </Button>
          </form>
        ) : (
          <Fragment>
            <form onSubmit={onSubmitOtp}>
              <FormInputHtV1
                label="OTP"
                onChange={onChangeOtp}
                value={otp}
                type="text"
                placeholder="******"
                feedBackError={otpError}
                feedBackMessage={otpErrorMessage}
              />
              <Flex justifyContent="center">
                <Button width={180} height={42} fontWeight={600} onClick={this.onSubmitOtp} disabled={loggingIn}>
                  SUBMIT
                </Button>
              </Flex>
            </form>
            {!resend && (
              <Flex marginTop="1.3em" justifyContent="center">
                <Button onClick={handleResend} disabled={resendtimer > 0}>
                  RESEND OTP {resendtimer > 0 ? resendtimer : ''}
                </Button>
              </Flex>
            )}
          </Fragment>
        )}
      </Box>
    );
  }
}

LoginViaOtp.defaultProps = {
  mobilesubmitted: false,
  mobile: '',
  mobileError: false,
  mobileErrorMessage: '',
  otp: '',
  otpError: false,
  otpErrorMessage: '',
  name: '',
  nameError: false,
  nameErrorMessage: '',
  email: '',
  emailError: false,
  emailErrorMessage: '',
  askName: false,
  askEmail: false
};
LoginViaOtp.propTypes = {
  mobilesubmitted: PropTypes.bool,
  mobile: PropTypes.string,
  mobileError: PropTypes.bool,
  mobileErrorMessage: PropTypes.string,
  otp: PropTypes.string,
  otpError: PropTypes.bool,
  otpErrorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  resend: PropTypes.bool.isRequired,
  onSubmitMobileNumber: PropTypes.func.isRequired,
  onSubmitOtp: PropTypes.func.isRequired,
  onChangeMobile: PropTypes.func.isRequired,
  onChangeOtp: PropTypes.func.isRequired,
  handleResend: PropTypes.func.isRequired,
  askName: PropTypes.bool,
  askEmail: PropTypes.bool,
  name: PropTypes.string,
  nameError: PropTypes.bool,
  nameErrorMessage: PropTypes.string,
  email: PropTypes.string,
  emailError: PropTypes.bool,
  emailErrorMessage: PropTypes.string,
  onSubmitName: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onSubmitEmail: PropTypes.func.isRequired,
  onSubmitNameAndEmail: PropTypes.func.isRequired
};
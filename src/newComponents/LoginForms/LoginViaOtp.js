import React from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
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
        this.setState(prevstate => ({ resendtimer: prevstate.resendtimer - 1 }));
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
      resend
    } = this.props;
    const {
      onSubmitMobileNumber, onSubmitOtp, onChangeMobile, onChangeOtp, handleResend
    } = this.props;
    const { resendtimer } = this.state;

    return (
      <Box>
        {!mobilesubmitted ? (
          <form onSubmit={onSubmitMobileNumber}>
            <FormInputHtV1
              label="Mobile Number"
              onChange={onChangeMobile}
              value={mobile}
              type="text"
              placeholder="Enter your 10 digits number"
              feedBackError={mobileError}
              feedBackMessage={mobileErrorMessage}
            />
            <Button onClick={this.onSubmitMobileNumber} disabled={loading}>
              GET OTP
            </Button>
          </form>
        ) : (
          <Box>
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
              <Button onClick={this.onSubmitOtp} disabled={loggingIn}>
                SUBMIT
              </Button>
            </form>
            {!resend && (
              <Button onClick={handleResend} disabled={resendtimer > 0}>
                RESEND OTP {resendtimer > 0 ? resendtimer : ''}
              </Button>
            )}
          </Box>
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
  otpErrorMessage: ''
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
  handleResend: PropTypes.func.isRequired
};

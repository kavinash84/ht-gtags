import React from 'react';
import FormInput from 'hometown-components-dev/lib/Forms/FormInput';
import Button from 'hometown-components-dev/lib/Buttons';
import PropTypes from 'prop-types';

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
      <div>
        {!mobilesubmitted ? (
          <form onSubmit={onSubmitMobileNumber}>
            <FormInput
              label="Mobile Number"
              onChange={onChangeMobile}
              value={mobile}
              type="text"
              placeholder="Enter your 10 digits number"
              feedBackError={mobileError}
              feedBackMessage={mobileErrorMessage}
            />
            <Button
              btnType="primary"
              size="block"
              boder="solid 1px rgba(151,151,151,0.47)"
              fontFamily="regular"
              height="38px"
              mt="0"
              ml="-1px"
              onClick={this.onSubmitMobileNumber}
              disabled={loading}
            >
              GET OTP
            </Button>
          </form>
        ) : (
          <div>
            <form onSubmit={onSubmitOtp}>
              <FormInput
                label="OTP"
                onChange={onChangeOtp}
                value={otp}
                type="text"
                placeholder="******"
                feedBackError={otpError}
                feedBackMessage={otpErrorMessage}
              />
              <Button
                btnType="primary"
                size="block"
                boder="solid 1px rgba(151,151,151,0.47)"
                fontFamily="regular"
                height="38px"
                mt="0"
                ml="-1px"
                onClick={this.onSubmitOtp}
                disabled={loggingIn}
              >
                SUBMIT
              </Button>
            </form>
            {!resend && (
              <Button
                boder="solid 1px rgba(151,151,151,0.47)"
                fontFamily="regular"
                fontSize="14px"
                mt="5px"
                ml="-1px"
                px="0"
                btnType="link"
                onClick={handleResend}
                disabled={resendtimer > 0}
              >
                RESEND OTP {resendtimer > 0 ? resendtimer : ''}
              </Button>
            )}
          </div>
        )}
      </div>
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

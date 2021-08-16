/* eslint-disable react/no-unused-state */
// import ResponsiveModal from "components/Modal";
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import { getOtp, resendOtp } from 'redux/modules/login';
import { getOtpfromSignUp, resendOtpfromSignUp } from 'redux/modules/login';
import { allowNChar, allowTypeOf } from 'utils/helper';

@connect(({ userLogin }) => ({
  loading: userLogin.loading,
  loggingIn: userLogin.loggingIn,
  getotpErrorMessage: userLogin.getotpErrorMessage
  // otpSent: userLogin.otpSent
}))
export default class OtpGenerator extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    otp: '',
    otpErrorMessage: 'OTP Should be 6 Characters',
    mobilesubmitted: false,
    resend: false,
    resendtimer: 30,
    timerref: ''
  };

  componentDidMount() {
    const { dispatch } = this.context.store;
    dispatch(getOtpfromSignUp(this.props.mobile));
    this.resendTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.mobilesubmitted && nextProps.getotpError && nextProps.getotpErrorMessage.includes('resend')) {
      this.setState({
        mobilesubmitted: true
      });
    }
    // if (nextProps.otpSent && nextProps.otpSent !== this.props.otpSent) {
    this.setState({
      mobilesubmitted: true
    });
    // }
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
    this.props.handleSubmit(otp);
  };

  handleResend = () => {
    this.setState({
      mobilesubmitted: false,
      resend: true
    });
    const { dispatch } = this.context.store;
    dispatch(resendOtpfromSignUp(this.props.mobile));
  };

  resendTimer = () => {
    this.setState({
      resendtimer: 30
    });
  };

  render() {
    const { loggingIn } = this.props;
    const {
      otp,
      otpError,
      otpErrorMessage,
      resend,
      resendtimer
      // otpSent
    } = this.state;
    return (
      <div>
        <Div>
          <Heading
            ellipsis={false}
            color="rgba(0.0.0.0.8)"
            ta="center"
            fontSize="1.125rem"
            mb="1rem"
            mt="1rem"
            lh="1.5"
            fontFamily="light"
          >
            We've sent an otp to your mobile
          </Heading>
          <Div ta="center">
            <form onSubmit={this.onSubmitOtp}>
              <FormInput
                label="OTP"
                onChange={this.onChangeOtp}
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
                height="30px"
                mt="5px"
                ml="-1px"
                pt="0"
                pb="0"
                onClick={this.handleResend}
                disabled={resendtimer > 0}
              >
                RESEND OTP {resendtimer > 0 ? resendtimer : ''}
              </Button>
            )}
          </Div>
        </Div>
      </div>
    );
  }
}

OtpGenerator.propTypes = {
  loggingIn: PropTypes.bool,
  getotpError: PropTypes.bool,
  getotpErrorMessage: PropTypes.string,
  // otpSent: PropTypes.bool,
  mobile: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

OtpGenerator.defaultProps = {
  loggingIn: false,
  getotpError: false,
  getotpErrorMessage: ''
  // otpSent: false
};

/* eslint-disable react/no-unused-state */
import ResponsiveModal from 'components/Modal';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Heading from 'hometown-components/lib/Heading';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getOtp, resendOtp } from 'redux/modules/login';
import { linkFuturePay, setFuturePayStatus as toggleFuturePayModal } from 'redux/modules/profile';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { validateMobile } from 'utils/validation';

@connect(({ profile, userLogin }) => ({
  setFuturePayStatus: profile.setFuturePayStatus,
  profile: profile.data,
  loading: userLogin.loading,
  loggingIn: userLogin.loggingIn,
  getotpErrorMessage: userLogin.getotpErrorMessage,
  otpSent: userLogin.otpSent,
  skipBirthdateCheck: userLogin.skipBirthdateCheck
}))
export default class FuturePayModal extends React.Component {
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

  createWallet = mobile => e => {
    e.preventDefault();
    const { resend } = this.state;
    const { dispatch } = this.context.store;
    if (resend) {
      return dispatch(resendOtp(mobile));
    }
    dispatch(getOtp(mobile));
  };

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

  onSubmitOtp = e => {
    e.preventDefault();
    const { otp } = this.state;
    if (otp.length < 6) {
      return this.setState({
        otpError: true
      });
    }
    const { dispatch } = this.context.store;
    dispatch(linkFuturePay(otp));
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

  handleResend = () => {
    this.setState({
      mobilesubmitted: false,
      resend: true
    });
  };

  handleModal = () => {
    const { dispatch } = this.context.store;
    dispatch(toggleFuturePayModal(false));
  };

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

    if (this.props.setFuturePayStatus !== nextProps.setFuturePayStatus) {
      console.log('Inside cdu', this.props.setFuturePayStatus);
      const {
        profile: { mobile = 0 },
        setFuturePayStatus,
        skipBirthdateCheck
      } = this.props;
      const { dispatch } = this.context.store;
      if (setFuturePayStatus && !skipBirthdateCheck) dispatch(getOtp(mobile));
    }
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

  render() {
    const { setFuturePayStatus, loggingIn, skipBirthdateCheck } = this.props;
    const {
      otp, otpError, otpErrorMessage, resend, resendtimer
    } = this.state;
    const open = !skipBirthdateCheck && setFuturePayStatus;
    return (
      <div>
        <ResponsiveModal
          classNames={{
            overlay: 'futurePayModalModal',
            modal: 'futurePayModal'
          }}
          onCloseModal={this.handleModal}
          open={open}
        >
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
              We've sent an otp to your registered mobile
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
        </ResponsiveModal>
      </div>
    );
  }
}

FuturePayModal.propTypes = {
  setFuturePayStatus: PropTypes.bool,
  skipBirthdateCheck: PropTypes.bool,
  loggingIn: PropTypes.bool,
  getotpError: PropTypes.bool,
  getotpErrorMessage: PropTypes.string,
  otpSent: PropTypes.bool,
  profile: PropTypes.object
};

FuturePayModal.defaultProps = {
  setFuturePayStatus: false,
  skipBirthdateCheck: false,
  loggingIn: false,
  getotpError: false,
  getotpErrorMessage: '',
  otpSent: false,
  profile: { mobile: '' }
};

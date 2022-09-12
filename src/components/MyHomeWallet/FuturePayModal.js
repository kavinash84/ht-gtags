/* eslint-disable react/no-unused-state */
import moment from 'moment';
import ResponsiveModal from 'components/Modal';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
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
  loginViaOtp: userLogin.otpSent,
  getotpErrorMessage: userLogin.getotpErrorMessage,
  otpSent: userLogin.otpSent,
  skipBirthdateCheck: userLogin.skipBirthdateCheck,
  askBirthDate: userLogin.askBirthDate
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
    timerref: '',
    loginViaOtp: this.props.loginViaOtp,
    showConfirmationModal: false,
    ageError: false
  };

  componentDidMount() {
    const {
      profile: { mobile = 0 },
      setFuturePayStatus,
      skipBirthdateCheck,
      loginViaOtp,
      askBirthDate
    } = this.props;
    /* eslint-disable */
    if (this.props.setFuturePayStatus) {
      const { dispatch } = this.context.store;
      if (loginViaOtp && setFuturePayStatus && !skipBirthdateCheck) {
        // If login is via otp
        if (askBirthDate) {
          dispatch(linkFuturePay({ skipOtpValidation: true }));
        } else {
          this.setState({ showConfirmationModal: true });
        }
      } else if (setFuturePayStatus && !skipBirthdateCheck) {
        // If login via google/email
        if (askBirthDate) {
          dispatch(getOtp(mobile));
        } else {
          this.setState({ showConfirmationModal: true });
        }
      }
    }
    this.checkAge();
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
    if (this.props.setFuturePayStatus && !this.state.otpReceived) {
      const {
        profile: { mobile = 0 }
      } = this.props;
      const { dispatch } = this.context.store;
      this.setState(
        {
          otpReceived: true
        },
        () => {
          if (!this.state.otpReceived) dispatch(getOtp(mobile));
        }
      );
    }
  }

  onSubmitOtp = e => {
    e.preventDefault();
    const { otp } = this.state;
    if (otp.length < 6) {
      return this.setState({
        otpError: true
      });
    }
    const { dispatch } = this.context.store;
    dispatch(linkFuturePay({ OTP: otp }));
  };

  onChangeOtp = e => {
    const { value } = e.target;
    if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      otp: value,
      otpError: false,
      otpReceived: false
    });
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

  handleModal = () => {
    const { dispatch } = this.context.store;
    dispatch(toggleFuturePayModal(false));
  };

  handleResend = () => {
    this.setState({
      mobilesubmitted: false,
      resend: true
    });
    const { dispatch } = this.context.store;
    const {
      profile: { mobile = 0 }
    } = this.props;
    dispatch(resendOtp(mobile));
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
  handleYes = () => {
    this.setState({ showConfirmationModal: false });
    const { dispatch } = this.context.store;
    const {
      profile: { mobile = 0, dob }
    } = this.props;
    const newDob = moment(dob, 'DD-MM-YYYY').toDate();
    const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
    const myAge = Math.floor((Date.now(currentDate) - newDob) / 31557600000);
    if (myAge > 10) {
      this.setState({ showConfirmationModal: false, ageError: false });
      // const { dispatch } = this.context.store;
      dispatch(getOtp(mobile));
    } else {
      this.setState({ ageError: true, showConfirmationModal: true });
    }
  };

  handleNo = () => {
    this.setState({ showConfirmationModal: false });
    this.handleModal();
  };

  handleOTPYes = () => {
    const {
      profile: { dob }
    } = this.props;
    const newDob = moment(dob, 'DD-MM-YYYY').toDate();
    const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
    const myAge = Math.floor((Date.now(currentDate) - newDob) / 31557600000);
    if (myAge > 10) {
      this.setState({ showConfirmationModal: false, ageError: false });
      const { dispatch } = this.context.store;
      dispatch(linkFuturePay({ skipOtpValidation: true }));
    } else {
      this.setState({ ageError: true });
    }
  };

  checkAge = () => {
    const {
      profile: { dob }
    } = this.props;
    const newDob = moment(dob, 'DD-MM-YYYY').toDate();
    const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
    const myAge = Math.floor((Date.now(currentDate) - newDob) / 31557600000);
    if (myAge > 10) {
      this.setState({ ageError: false });
    } else {
      this.setState({ ageError: true });
    }
  };

  render() {
    const { setFuturePayStatus, loggingIn, skipBirthdateCheck } = this.props;
    const {
      otp,
      otpError,
      otpErrorMessage,
      resend,
      resendtimer,
      loginViaOtp,
      showConfirmationModal,
      ageError
    } = this.state;
    const walletNotCreated = !skipBirthdateCheck && setFuturePayStatus;
    const open = walletNotCreated && !loginViaOtp && !ageError;
    const openLoginViaOtp = loginViaOtp && showConfirmationModal && setFuturePayStatus && !ageError;
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
          {showConfirmationModal ? (
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
                Your wallet is not created would you like to create it?
              </Heading>
              <Div style={{ display: 'flex' }}>
                <button style={{ margin: '0 10px' }} className="google-login-btn" onClick={() => this.handleYes()}>
                  Yes
                </button>
                <button style={{ margin: '0 10px' }} className="google-login-btn" onClick={() => this.handleNo()}>
                  No
                </button>
              </Div>
              {ageError ? (
                <Text mt={10} textAlign="center" color="red" fontSize="14px">
                  User should be atleast 10 years old to create wallet.
                </Text>
              ) : null}
            </Div>
          ) : setFuturePayStatus ? (
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
          ) : null}
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{
            overlay: 'futurePayModalModal',
            modal: 'futurePayModal'
          }}
          onCloseModal={this.handleModal}
          open={openLoginViaOtp}
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
              Your wallet is not created would you like to create it?
            </Heading>
            <Div style={{ display: 'flex' }}>
              <button style={{ margin: '0 10px' }} className="google-login-btn" onClick={() => this.handleOTPYes()}>
                Yes
              </button>
              <button style={{ margin: '0 10px' }} className="google-login-btn" onClick={() => this.handleNo()}>
                No
              </button>
            </Div>
            {ageError ? (
              <Text mt={10} textAlign="center" color="red" fontSize="14px">
                User should be atleast 10 years old to create wallet.
              </Text>
            ) : null}
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
  profile: PropTypes.object,
  loginViaOtp: PropTypes.bool,
  askBirthDate: PropTypes.bool
};

FuturePayModal.defaultProps = {
  setFuturePayStatus: false,
  skipBirthdateCheck: false,
  loggingIn: false,
  getotpError: false,
  getotpErrorMessage: '',
  otpSent: false,
  loginViaOtp: false,
  askBirthDate: false,
  profile: { mobile: '' }
};

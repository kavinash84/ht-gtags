/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { FeedBackMessage } from 'hometown-components-dev/lib/LabelHtV1';

// Custom Components
import DatePicker from 'components/Form/DatePicker';

import { getOtpfromSignUp, resendOtpfromSignUp } from 'redux/modules/login';

const formatDate = date => {
  if (date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }
};

class UpdateContactAndDob extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 'createWallet',
      mobilesubmitted: false,
      resend: false,
      resendtimer: 30,
      timerref: ''
    };
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

  isValid = () => {
    const { phoneError, dobError, phone } = this.props;
    // if (firstNameError) return false;
    // if (lastNameError) return false;
    if (phoneError) return false;
    if (dobError) return false;
    // if (!firstName) return false;
    // if (!lastName) return false;
    if (!phone) return false;
    return true;
  };

  handleResend = phone => {
    this.setState({
      mobilesubmitted: false,
      resend: true
    });
    const { dispatch } = this.context.store;
    dispatch(resendOtpfromSignUp(phone));
  };
  render() {
    const {
      phone,
      phoneError,
      phoneErrorMessage,
      onChangeDob,
      dob,
      dobError,
      dobErrorMessage,
      loggingIn,
      onChangePhone,
      onSubmitMobileNumber,
      onSubmitMobileAndDob,
      onChangeOtp,
      otp,
      otpError,
      otpErrorMessage,
      LoaderIcon,
      birthdateCheck
      // mobilesubmitted,
      // session,
      // loginViaLogin,
      // onSubmitOtp,
      // handleResend,
    } = this.props;
    const { view, resendtimer, resend } = this.state;

    return (
      <div>
        <Row display="block" mr="0" ml="0" mb="10px">
          <div col="12" ta="center">
            <Heading color="color676767" mt="0" mb={20} fontWeight="400" fontSize="26px" ta="center" fontFamily="light">
              Update Profile
            </Heading>
            {view === 'createWallet' ? (
              <Div>
                <Div>
                  <Text color="color676767" ta="center" mb={20}>
                    Your wallet is not created. Would you like to create a wallet?
                  </Text>
                </Div>
                <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    style={{ margin: '0 10px' }}
                    className="google-login-btn"
                    onClick={() => this.setState({ view: 'dobAndMobile' })}
                  >
                    Yes
                  </button>
                  <button
                    style={{ margin: '0 10px' }}
                    className="google-login-btn"
                    onClick={() => {
                      birthdateCheck(true);
                      this.setState({ view: 'mobile' });
                    }}
                  >
                    No
                  </button>
                </Div>
              </Div>
            ) : view === 'dobAndMobile' ? (
              <Div>
                <Div>
                  <Text color="color676767" ta="center" mb={20}>
                    Your wallet is not created. Would you like to create a wallet?
                  </Text>
                </Div>
                <Div>
                  <Div mb="0.625rem">
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      selected={formatDate(dob)}
                      onSelect={onChangeDob}
                    />
                    {dobError && (
                      <Text mt={10} color="red" fontSize="12px">
                        {dobErrorMessage}
                      </Text>
                    )}
                  </Div>
                  <FormInputHtV1
                    label="Mobile"
                    type="text"
                    placeholder=""
                    onChange={onChangePhone}
                    value={phone}
                    feedBackError={phoneError}
                    feedBackMessage={phoneErrorMessage}
                  />
                  <button
                    style={dobError ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
                    disabled={dobError}
                    className="google-login-btn"
                    onClick={() => {
                      const { dispatch } = this.context.store;
                      this.setState({
                        view: 'otp',
                        mobilesubmitted: true
                      });
                      dispatch(getOtpfromSignUp(phone));
                    }}
                  >
                    {loggingIn && <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />}
                    {loggingIn ? 'Please Wait' : 'Update'}
                  </button>
                </Div>
              </Div>
            ) : view === 'mobile' ? (
              <div>
                <Row>
                  <Div variant="col-12">
                    <Text>{'Contact information is required to login'}</Text>
                  </Div>
                </Row>
                <Text>
                  <form
                    // onSubmit={onSubmitForm}
                    id="custom_form"
                    name="custom_form"
                    encType="multipart/form-data"
                    className="bulk-order-form"
                  >
                    <FormInputHtV1
                      label="Mobile"
                      type="text"
                      placeholder=""
                      onChange={onChangePhone}
                      value={phone}
                      feedBackError={phoneError}
                      feedBackMessage={phoneErrorMessage}
                    />
                  </form>
                  <button
                    disabled={!this.isValid()}
                    className="google-login-btn"
                    onClick={e => onSubmitMobileNumber(e)}
                  >
                    {loggingIn ? (
                      <span>
                        Please Wait
                        <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                      </span>
                    ) : (
                      'Update'
                    )}
                  </button>
                </Text>
              </div>
            ) : view === 'otp' ? (
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
                  <form>
                    <FormInputHtV1
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
                      onClick={onSubmitMobileAndDob}
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
                      onClick={() => this.handleResend(phone)}
                      disabled={resendtimer > 0}
                    >
                      RESEND OTP {resendtimer > 0 ? resendtimer : ''}
                    </Button>
                  )}
                </Div>
              </Div>
            ) : null}
            {/* <Text color="color676767" ta="center" mb={20}>
              'Your wallet is not created. Would you like to create a wallet?'
            </Text>
            {showDobInput ? (
              <Div>
                <Div mb="0.625rem">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    selected={formatDate(dob)}
                    onSelect={onChangeDob}
                  />
                  {dobError && (
                    <Text mt={10} color="red" fontSize="12px">
                      {dobErrorMessage}
                    </Text>
                  )}
                </Div>
                <button
                  style={dobError ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
                  disabled={dobError}
                  className="google-login-btn"
                  onClick={() => {
                    const dobValue = moment(dob).format('YYYY-MM-DD');
                    loginViaLogin({}, session, null, null, dobValue, false);
                    // onSubmitDob();
                  }}
                >
                  {loggingIn && <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />}
                  {loggingIn ? 'Please Wait' : 'Update'}
                </button>
              </Div>
            ) : (
              <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  style={{ margin: '0 10px' }}
                  className="google-login-btn"
                  onClick={() => this.setState({ showDobInput: true })}
                >
                  Yes
                </button>
                <button
                  style={{ margin: '0 10px' }}
                  className="google-login-btn"
                  onClick={() => {
                    loginViaLogin({}, session, null, null, null, true);
                    birthdateCheck(true);
                    // onSkipDob();
                  }}
                >
                  No
                </button>
              </Div>
            )} */}
          </div>
        </Row>
      </div>
    );
    //   }
    //   return (
    //     <Div style={{ display: 'flex' }}>
    //       <button
    //         style={{ margin: '0 10px' }}
    //         className="google-login-btn"
    //         onClick={() => this.setState({ showDobInput: true })}
    //       >
    //         Yes
    //       </button>
    //       <button
    //         style={{ margin: '0 10px' }}
    //         className="google-login-btn"
    //         onClick={() => {
    //           loginViaLogin({}, session, null, null, dob);
    //           birthdateCheck(true);
    //         }}
    //       >
    //         No
    //       </button>
    //     </Div>
    //   );
  }
}

UpdateContactAndDob.defaultProps = {
  // firstName: '',
  // firstNameErrorMessage: '',
  // lastName: '',
  // lastNameErrorMessage: '',
  phone: '',
  dob: '',
  otp: '',
  phoneErrorMessage: ''
  // session: ''
};

UpdateContactAndDob.propTypes = {
  // loginViaLogin: PropTypes.func.isRequired,
  // onChangeLastName: PropTypes.func.isRequired,
  // onChangeFirstName: PropTypes.func.isRequired,
  birthdateCheck: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onChangeDob: PropTypes.func.isRequired,
  onSubmitMobileNumber: PropTypes.func.isRequired,
  onSubmitMobileAndDob: PropTypes.func.isRequired,
  onChangeOtp: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  // firstName: PropTypes.string,
  // firstNameError: PropTypes.bool.isRequired,
  // firstNameErrorMessage: PropTypes.string,
  phone: PropTypes.string,
  phoneError: PropTypes.bool.isRequired,
  phoneErrorMessage: PropTypes.string,
  dob: PropTypes.instanceOf(Date),
  dobError: PropTypes.bool.isRequired,
  dobErrorMessage: PropTypes.string.isRequired,
  otp: PropTypes.number,
  otpError: PropTypes.bool.isRequired,
  otpErrorMessage: PropTypes.string.isRequired,
  LoaderIcon: PropTypes.string.isRequired
  // lastName: PropTypes.string,
  // lastNameError: PropTypes.bool.isRequired,
  // lastNameErrorMessage: PropTypes.string,
  // session: PropTypes.string
};

export default UpdateContactAndDob;

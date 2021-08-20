import React, { Component } from 'react';
import moment from 'moment';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import PropTypes from 'prop-types';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import { FeedBackMessage } from 'hometown-components-dev/lib/LabelHtV1';
import DatePicker from 'components/Form/DatePicker';

const formatDate = date => {
  if (date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }
};

class UpdateContactAndDob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDobInput: false,
      hideDobInput: false
    };
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

  render() {
    const {
      phone,
      phoneError,
      phoneErrorMessage,
      birthdateCheck,
      onChangeDob,
      dob,
      dobError,
      dobErrorMessage,
      session,
      loginViaLogin,
      loggingIn,
      onChangePhone,
      onSubmitMobileNumber,
      mobilesubmitted,
      onSubmitOtp,
      onChangeOtp,
      otp,
      otpError,
      otpErrorMessage,
      resend,
      handleResend,
      resendtimer
    } = this.props;
    const { showDobInput, hideDobInput } = this.state;
    return (
      <div>
        <Row display="block" mr="0" ml="0" mb="10px">
          <Div col="12" ta="center">
            <Heading color="color676767" mt="0" mb="0" fontWeight="400" fontSize="26px" ta="center" fontFamily="light">
              Update Profile
            </Heading>
            <Text color="color676767" ta="center">
              'Your wallet is not created. Would you like to create a wallet?'
            </Text>
            {!mobilesubmitted ? (
              showDobInput ? (
                <Div style={{ display: hideDobInput ? 'none' : 'block' }}>
                  <Div mb="0.625rem">
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={formatDate(dob)}
                      maxDate={moment()
                        .subtract(10, 'years')
                        .toDate()}
                      onSelect={onChangeDob}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />

                    {dobError && <FeedBackMessage type="error">{dobErrorMessage}</FeedBackMessage>}
                  </Div>
                  <form
                    onSubmit={this.onSubmitForm}
                    id="custom_form"
                    name="custom_form"
                    encType="multipart/form-data"
                    className="bulk-order-form"
                  >
                    <FormInput
                      label="Phone"
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
                    onClick={e => {
                      e.preventDefault();
                      if (hideDobInput) {
                        loginViaLogin({}, session, phone);
                      } else {
                        onSubmitMobileNumber(e);
                      }
                    }}
                  >
                    {loggingIn ? 'Please Wait' : 'Update'}
                  </button>
                  {/* <button
                    style={dobError ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
                    disabled={dobError}
                    className="google-login-btn"
                    onClick={() => {
                      const dobValue = moment(dob).format('YYYY-MM-DD');
                      loginViaLogin({}, session, null, null, dobValue, false);
                    }}
                  >
                    {loggingIn && <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />}
                    {loggingIn ? 'Please Wait' : 'Update'}
                  </button> */}
                </Div>
              ) : (
                <Div style={{ display: 'flex' }}>
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
                    // onClick={() => {
                    //   loginViaLogin({}, session, null, null, null, true);
                    //   birthdateCheck(true);
                    // }}
                    onClick={() => this.setState({ hideDobInput: true })}
                  >
                    No
                  </button>
                </Div>
              )
            ) : null
            //   <div>
            //     <form onSubmit={onSubmitOtp}>
            //       <FormInput
            //         label="OTP"
            //         onChange={onChangeOtp}
            //         value={otp}
            //         type="text"
            //         placeholder="******"
            //         feedBackError={otpError}
            //         feedBackMessage={otpErrorMessage}
            //       />
            //       <Button
            //         btnType="primary"
            //         size="block"
            //         boder="solid 1px rgba(151,151,151,0.47)"
            //         fontFamily="regular"
            //         height="38px"
            //         mt="0"
            //         ml="-1px"
            //         onClick={this.onSubmitOtp}
            //         disabled={loggingIn}
            //       >
            //         SUBMIT
            //       </Button>
            //     </form>
            //     {!resend && (
            //       <Button
            //         boder="solid 1px rgba(151,151,151,0.47)"
            //         fontFamily="regular"
            //         height="30px"
            //         mt="5px"
            //         ml="-1px"
            //         onClick={handleResend}
            //         disabled={resendtimer > 0}
            //       >
            //         RESEND OTP {resendtimer > 0 ? resendtimer : ''}
            //       </Button>
            //     )}
            //   </div>
            }
          </Div>
        </Row>
      </div>
    );
  }
}

UpdateContactAndDob.defaultProps = {
  firstName: '',
  firstNameErrorMessage: '',
  lastName: '',
  lastNameErrorMessage: '',
  phone: '',
  phoneErrorMessage: '',
  session: ''
};

UpdateContactAndDob.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  onChangeLastName: PropTypes.func.isRequired,
  onChangeFirstName: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  firstNameError: PropTypes.bool.isRequired,
  firstNameErrorMessage: PropTypes.string,
  phone: PropTypes.string,
  phoneError: PropTypes.bool.isRequired,
  DobError: PropTypes.bool.isRequired,
  phoneErrorMessage: PropTypes.string,
  lastName: PropTypes.string,
  lastNameError: PropTypes.bool.isRequired,
  lastNameErrorMessage: PropTypes.string,
  session: PropTypes.string
};

export default UpdateContactAndDob;

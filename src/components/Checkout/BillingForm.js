import React from 'react';
import PropTypes from 'prop-types';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/billing';
import { isBlank } from 'js-utility-functions';

import Pincode from './ShippingPincode';

const mapStateToProps = ({ billing }) => ({
  ...billing
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

class BillingForm extends React.Component {
  validateForm = () => {
    const {
      fullName,
      fullNameFeedBackError,
      email,
      emailFeedBackError,
      phone,
      phoneFeedBackError,
      address,
      addressFeedBackError,
      city,
      cityFeedBackError,
      pincode,
      pincodeFeedBackError,
      state,
      stateFeedBackError
    } = this.props;
    const {
      setCityError,
      setNameError,
      setPhoneError,
      setEmailError,
      setAddressError,
      setPincodeError,
      setStateError
    } = this.props;

    const fullNameError = isBlank(fullName) || fullNameFeedBackError;
    const emailError = isBlank(email) || emailFeedBackError;
    const phoneError = isBlank(phone) || phoneFeedBackError;
    const pincodeError = isBlank(pincode) || pincodeFeedBackError;
    const cityError = isBlank(city) || cityFeedBackError;
    const stateError = isBlank(state) || stateFeedBackError;
    const addressError = isBlank(address) || addressFeedBackError;

    if (fullNameError || emailError || pincodeError || phoneError || cityError || stateError || addressError) {
      setNameError(fullNameError);
      setEmailError(emailError);
      setPincodeError(pincodeError);
      setPhoneError(phoneError);
      setCityError(cityError);
      setStateError(stateError);
      setAddressError(addressError);
      return {
        error: true,
        data: null
      };
    }
    return {
      error: false,
      data: {
        fullName,
        phone,
        email,
        pincode,
        address,
        city,
        state
      }
    };
  };

  render() {
    const {
      fullName,
      fullNameFeedBackError,
      fullNameFeedBackMessage,
      email,
      emailFeedBackError,
      emailFeedBackMessage,
      phone,
      phoneFeedBackError,
      phoneFeedBackMessage,
      address,
      addressFeedBackError,
      addressFeedBackMessage,
      city,
      cityFeedBackError,
      cityFeedBackMessage,
      pincode,
      pincodeFeedBackError,
      pincodeFeedBackMessage,
      state,
      stateFeedBackError,
      stateFeedBackMessage
    } = this.props;

    const {
      onChangeEmail,
      onChangeCity,
      onChangeState,
      onChangePhone,
      onChangeAddress,
      onChangeFullName,
      onChangePincode
    } = this.props;

    return (
      <div>
        <Row display="block" mr="0" ml="0">
          <Div col="5">
            <FormInput
              label="Full Name"
              type="text"
              placeholder=""
              onChange={e => onChangeFullName(e.target.value)}
              value={fullName}
              feedBackError={fullNameFeedBackError}
              feedBackMessage={fullNameFeedBackMessage}
            />
            <Pincode
              pincode={pincode}
              feedBackError={pincodeFeedBackError}
              onChangePincode={onChangePincode}
              feedBackMessage={pincodeFeedBackMessage}
            />
            <FormInput
              label="Address"
              type="text-area"
              placeholder=""
              onChange={e => onChangeAddress(e.target.value)}
              value={address}
              feedBackError={addressFeedBackError}
              feedBackMessage={addressFeedBackMessage}
            />
            <FormInput
              label="City"
              type="text"
              placeholder=""
              onChange={e => onChangeCity(e.target.value)}
              value={city}
              feedBackError={cityFeedBackError}
              feedBackMessage={cityFeedBackMessage}
            />
            <FormInput
              label="State"
              type="text"
              placeholder=""
              onChange={e => onChangeState(e.target.value)}
              value={state}
              feedBackError={stateFeedBackError}
              feedBackMessage={stateFeedBackMessage}
            />
            <FormInput
              label="Email ID"
              type="text"
              placeholder=""
              onChange={e => onChangeEmail(e.target.value)}
              value={email}
              feedBackError={emailFeedBackError}
              feedBackMessage={emailFeedBackMessage}
            />
            <FormInput
              label="Phone"
              type="text"
              placeholder=""
              onChange={e => onChangePhone(e.target.value)}
              value={phone}
              feedBackError={phoneFeedBackError}
              feedBackMessage={phoneFeedBackMessage}
            />
          </Div>
        </Row>
      </div>
    );
  }
}

BillingForm.defaultProps = {};
BillingForm.propTypes = {
  fullName: PropTypes.string.isRequired,
  fullNameFeedBackError: PropTypes.bool.isRequired,
  fullNameFeedBackMessage: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailFeedBackError: PropTypes.bool.isRequired,
  emailFeedBackMessage: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  phoneFeedBackError: PropTypes.bool.isRequired,
  phoneFeedBackMessage: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  addressFeedBackError: PropTypes.bool.isRequired,
  addressFeedBackMessage: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  cityFeedBackError: PropTypes.bool.isRequired,
  cityFeedBackMessage: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  pincodeFeedBackError: PropTypes.bool.isRequired,
  pincodeFeedBackMessage: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  stateFeedBackError: PropTypes.bool.isRequired,
  stateFeedBackMessage: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onChangeFullName: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onChangeState: PropTypes.func.isRequired,
  onChangePincode: PropTypes.func.isRequired,
  setCityError: PropTypes.func.isRequired,
  setNameError: PropTypes.func.isRequired,
  setPhoneError: PropTypes.func.isRequired,
  setEmailError: PropTypes.func.isRequired,
  setAddressError: PropTypes.func.isRequired,
  setPincodeError: PropTypes.func.isRequired,
  setStateError: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(BillingForm);
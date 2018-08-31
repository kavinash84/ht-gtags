import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Pincode from './Pincode';

const mapStateToProps = (reduxstate, props) => {
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
  } = reduxstate.address[props.formType];
  return {
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
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const AddressForm = props => {
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
  } = props;
  const {
    onChangeEmail, onChangePhone, onChangeAddress, onChangeFullName, onChangePincode
  } = props;
  const { formType, isLoggedIn, userEmail } = props;
  return (
    <div>
      <FormInput
        label="Full Name"
        type="text"
        placeholder=""
        onChange={e => onChangeFullName(formType, e.target.value)}
        value={fullName}
        feedBackError={fullNameFeedBackError}
        feedBackMessage={fullNameFeedBackMessage}
      />
      <FormInput
        label="Email ID"
        type="text"
        placeholder=""
        onChange={e => onChangeEmail(formType, e.target.value)}
        value={isLoggedIn ? userEmail : email}
        feedBackError={isLoggedIn ? false : emailFeedBackError}
        feedBackMessage={emailFeedBackMessage}
        readOnly={isLoggedIn}
      />
      <FormInput
        label="Phone"
        type="text"
        placeholder=""
        onChange={e => onChangePhone(formType, e.target.value)}
        value={phone}
        feedBackError={phoneFeedBackError}
        feedBackMessage={phoneFeedBackMessage}
      />
      <FormInput
        label="Address"
        type="textarea"
        placeholder=""
        onChange={e => onChangeAddress(formType, e.target.value)}
        value={address}
        feedBackError={addressFeedBackError}
        feedBackMessage={addressFeedBackMessage}
      />
      <Pincode
        pincode={pincode}
        formType={formType}
        feedBackError={pincodeFeedBackError}
        onChangePincode={onChangePincode}
        feedBackMessage={pincodeFeedBackMessage}
      />
      <FormInput
        label="City"
        type="text"
        placeholder=""
        value={city}
        feedBackError={cityFeedBackError}
        feedBackMessage={cityFeedBackMessage}
        readOnly
      />
      <FormInput
        label="State"
        type="text"
        placeholder=""
        value={state}
        feedBackError={stateFeedBackError}
        feedBackMessage={stateFeedBackMessage}
        readOnly
      />
    </div>
  );
};

AddressForm.defaultProps = {
  formType: '',
  isLoggedIn: false
};

AddressForm.propTypes = {
  formType: PropTypes.string,
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
  onChangePincode: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  userEmail: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);

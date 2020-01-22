import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Pincode from './Pincode';

const mapStateToProps = ({ address }, props) => ({
  ...address[props.formType]
});

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
    address1,
    address2,
    address3,
    addressFeedBackError1,
    addressFeedBackMessage1,
    addressFeedBackError2,
    addressFeedBackMessage2,
    addressFeedBackError3,
    addressFeedBackMessage3,
    city,
    cityFeedBackError,
    cityFeedBackMessage,
    pincode,
    pincodeFeedBackError,
    pincodeFeedBackMessage,
    state,
    stateFeedBackError,
    stateFeedBackMessage,
    gst,
    gstFeedBackError,
    gstFeedBackMessage
  } = props;
  const {
    onChangeEmail,
    onChangePhone,
    onChangeAddress1,
    onChangeAddress2,
    onChangeAddress3,
    onChangeFullName,
    onChangePincode,
    onChangeGST
  } = props;
  const { formType, isLoggedIn, userEmail } = props;
  return (
    <div>
      <Row display="block" mr="0" ml="0">
        <Div col="12">
          <FormInput
            label="Full Name *"
            type="text"
            placeholder=""
            onChange={e => onChangeFullName(formType, e.target.value)}
            value={fullName}
            feedBackError={fullNameFeedBackError}
            feedBackMessage={fullNameFeedBackMessage}
          />
        </Div>
      </Row>
      <Row display="block" mr="0" ml="0">
        {!isLoggedIn && (
          <Div col="6" pr="10px">
            <FormInput
              label="Email ID *"
              type={isLoggedIn ? 'hidden' : 'text'}
              placeholder=""
              onChange={e => onChangeEmail(formType, e.target.value)}
              value={isLoggedIn ? userEmail : email}
              feedBackError={isLoggedIn ? false : emailFeedBackError}
              feedBackMessage={emailFeedBackMessage}
              readOnly={isLoggedIn}
            />
          </Div>
        )}
        <Div col={!isLoggedIn ? '6' : '12'} pl={!isLoggedIn ? '10px' : '0'}>
          <FormInput
            label="Phone *"
            type="text"
            placeholder=""
            onChange={e => onChangePhone(formType, e.target.value)}
            value={phone}
            feedBackError={phoneFeedBackError}
            feedBackMessage={phoneFeedBackMessage}
          />
        </Div>
      </Row>
      <Row display="block" mr="0" ml="0">
        <Div col="4" pr="10px">
          <FormInput
            id="add1"
            label="Flat, House no., Building, Apartment: *"
            type="textarea"
            placeholder=""
            onChange={e => onChangeAddress1(formType, e.target.value.replace(/#/g, ''))}
            value={address1}
            feedBackError={addressFeedBackError1}
            feedBackMessage={addressFeedBackMessage1}
          />
        </Div>
        <Div col="4" pr="10px" pl="10px">
          <FormInput
            id="add2"
            label="Area, Colony, Street, Sector:"
            type="textarea"
            placeholder=""
            onChange={e => onChangeAddress2(formType, e.target.value.replace(/#/g, ''))}
            value={address2}
            feedBackError={addressFeedBackError2}
            feedBackMessage={addressFeedBackMessage2}
          />
        </Div>
        <Div col="4" pl="10px">
          <FormInput
            id="add3"
            label="Landmark,Village:"
            type="textarea"
            placeholder=""
            onChange={e => onChangeAddress3(formType, e.target.value.replace(/#/g, ''))}
            value={address3}
            feedBackError={addressFeedBackError3}
            feedBackMessage={addressFeedBackMessage3}
          />
        </Div>
      </Row>
      <Row display="block" mr="0" ml="0">
        <Div col="6" pr="10px">
          <Pincode
            id="pincodeId"
            pincode={pincode}
            formType={formType}
            feedBackError={pincodeFeedBackError}
            onChangePincode={onChangePincode}
            feedBackMessage={pincodeFeedBackMessage}
          />
        </Div>
        <Div col="6" pr="10px">
          <FormInput
            label="City *"
            type="text"
            placeholder=""
            value={city}
            feedBackError={cityFeedBackError}
            feedBackMessage={cityFeedBackMessage}
            readOnly
          />
        </Div>
      </Row>
      <Row display="block" mr="0" ml="0">
        <Div col="6" pr="10px">
          <FormInput
            label="State *"
            type="text"
            placeholder=""
            value={state}
            feedBackError={stateFeedBackError}
            feedBackMessage={stateFeedBackMessage}
            readOnly
          />
        </Div>
        {formType !== 'billing' && (
          <Div col="6" pr="10px">
            <FormInput
              label="GST(optional)"
              type="text"
              placeholder=""
              onChange={e => onChangeGST(formType, e.target.value)}
              value={gst}
              feedBackError={gstFeedBackError}
              feedBackMessage={gstFeedBackMessage}
            />
          </Div>
        )}
      </Row>
    </div>
  );
};

AddressForm.defaultProps = {
  formType: '',
  isLoggedIn: false,
  address2: '',
  address3: ''
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
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string,
  address3: PropTypes.string,
  addressFeedBackError1: PropTypes.bool.isRequired,
  addressFeedBackMessage1: PropTypes.string.isRequired,
  addressFeedBackError2: PropTypes.bool.isRequired,
  addressFeedBackMessage2: PropTypes.string.isRequired,
  addressFeedBackError3: PropTypes.bool.isRequired,
  addressFeedBackMessage3: PropTypes.string.isRequired,
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
  onChangeAddress1: PropTypes.func.isRequired,
  onChangeAddress2: PropTypes.func.isRequired,
  onChangeAddress3: PropTypes.func.isRequired,
  onChangeFullName: PropTypes.func.isRequired,
  onChangePincode: PropTypes.func.isRequired,
  onChangeGST: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  userEmail: PropTypes.string.isRequired,
  gst: PropTypes.string.isRequired,
  gstFeedBackError: PropTypes.bool.isRequired,
  gstFeedBackMessage: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm);

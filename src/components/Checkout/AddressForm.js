import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
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
    <Box pt={30}>
      <Box mb={20} pb={20} sx={{ borderBottom: 'divider' }}>
        <Label variant="formHeading">Personal Details</Label>
      </Box>
      <Row>
        <Col variant="col-12">
          <FormInput
            label="Full Name *"
            type="text"
            placeholder=""
            onChange={e => onChangeFullName(formType, e.target.value)}
            value={fullName}
            feedBackError={fullNameFeedBackError}
            feedBackMessage={fullNameFeedBackMessage}
            variant="input"
          />
        </Col>
        {!isLoggedIn && (
          <Col variant="col-6">
            <FormInput
              label="Email ID *"
              type={isLoggedIn ? 'hidden' : 'text'}
              placeholder=""
              onChange={e => onChangeEmail(formType, e.target.value)}
              value={isLoggedIn ? userEmail : email}
              feedBackError={isLoggedIn ? false : emailFeedBackError}
              feedBackMessage={emailFeedBackMessage}
              readOnly={isLoggedIn}
              variant="input"
            />
          </Col>
        )}
        <Col variant={!isLoggedIn ? 'col-6' : 'col-12'}>
          <FormInput
            label="Phone *"
            type="text"
            placeholder=""
            onChange={e => onChangePhone(formType, e.target.value)}
            value={phone}
            feedBackError={phoneFeedBackError}
            feedBackMessage={phoneFeedBackMessage}
            variant="input"
          />
        </Col>
      </Row>
      <Box mb={20} pb={20} mt={30} sx={{ borderBottom: 'divider' }}>
        <Label variant="formHeading">{formType === 'billing' ? 'Billing' : 'Shipping'} Address</Label>
      </Box>
      <Row>
        <Col variant="col-4">
          <FormInput
            id="add1"
            label="Flat, House no., Building, Apartment*"
            type="textarea"
            onChange={e => onChangeAddress1(formType, e.target.value.replace(/#/g, ''))}
            value={address1}
            feedBackError={addressFeedBackError1}
            feedBackMessage={addressFeedBackMessage1}
            variant="input"
            height="auto"
          />
        </Col>
        <Col variant="col-4">
          <FormInput
            id="add2"
            label="Area, Colony, Street, Sector: *"
            type="textarea"
            onChange={e => onChangeAddress2(formType, e.target.value.replace(/#/g, ''))}
            value={address2}
            feedBackError={addressFeedBackError2}
            feedBackMessage={addressFeedBackMessage2}
            variant="input"
            height="auto"
          />
        </Col>
        <Col variant="col-4">
          <FormInput
            id="add3"
            label="Landmark,Village"
            type="textarea"
            placeholder=""
            onChange={e => onChangeAddress3(formType, e.target.value.replace(/#/g, ''))}
            value={address3}
            feedBackError={addressFeedBackError3}
            feedBackMessage={addressFeedBackMessage3}
            variant="input"
            height="auto"
          />
        </Col>
      </Row>
      <Row>
        <Col variant="col-6">
          <Pincode
            id="pincodeId"
            pincode={pincode}
            formType={formType}
            feedBackError={pincodeFeedBackError}
            onChangePincode={onChangePincode}
            feedBackMessage={pincodeFeedBackMessage}
          />
        </Col>
        <Col variant="col-6">
          <FormInput
            label="State *"
            type="text"
            placeholder=""
            value={state}
            feedBackError={stateFeedBackError}
            feedBackMessage={stateFeedBackMessage}
            readOnly
            variant="input"
          />
        </Col>
      </Row>
      <Row>
        <Col variant="col-6">
          <FormInput
            label="City *"
            type="text"
            placeholder=""
            value={city}
            feedBackError={cityFeedBackError}
            feedBackMessage={cityFeedBackMessage}
            readOnly
            variant="input"
          />
        </Col>
        {formType !== 'billing' && (
          <Col variant="col-6">
            <FormInput
              label="GST(optional)"
              type="text"
              placeholder=""
              onChange={e => onChangeGST(formType, e.target.value)}
              value={gst}
              feedBackError={gstFeedBackError}
              feedBackMessage={gstFeedBackMessage}
              variant="input"
            />
          </Col>
        )}
      </Row>
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);

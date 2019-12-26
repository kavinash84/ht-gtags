import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
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
    // address3,
    addressFeedBackError1,
    addressFeedBackMessage1,
    addressFeedBackError2,
    addressFeedBackMessage2,
    // addressFeedBackError3,
    // addressFeedBackMessage3,
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
    // onChangeAddress3,
    onChangeFullName,
    onChangePincode,
    onChangeGST
  } = props;
  const { formType, isLoggedIn, userEmail } = props;
  return (
    <BoxHtV1 mt={22}>
      <RowHtV1 display="block" mr="0" ml="0">
        <BoxHtV1 col="12" width="100%">
          <FormInput
            label="Full Name *"
            type="text"
            placeholder=""
            onChange={e => onChangeFullName(formType, e.target.value)}
            value={fullName}
            feedBackError={fullNameFeedBackError}
            feedBackMessage={fullNameFeedBackMessage}
            variant="personalDetailsField"
          />
        </BoxHtV1>
      </RowHtV1>
      <RowHtV1 display="block" mr="0" ml="0">
        {!isLoggedIn && (
          <BoxHtV1 col="6" pr={10}>
            <FormInput
              label="Email ID *"
              type={isLoggedIn ? 'hidden' : 'text'}
              placeholder=""
              onChange={e => onChangeEmail(formType, e.target.value)}
              value={isLoggedIn ? userEmail : email}
              feedBackError={isLoggedIn ? false : emailFeedBackError}
              feedBackMessage={emailFeedBackMessage}
              readOnly={isLoggedIn}
              variant="personalDetailsField"
              width="291px"
            />
          </BoxHtV1>
        )}
        <BoxHtV1 col={!isLoggedIn ? '6' : '12'}>
          <FormInput
            label="Phone *"
            type="text"
            placeholder=""
            onChange={e => onChangePhone(formType, e.target.value)}
            value={phone}
            feedBackError={phoneFeedBackError}
            feedBackMessage={phoneFeedBackMessage}
            variant="personalDetailsField"
            width="291px"
          />
        </BoxHtV1>
      </RowHtV1>
      <BoxHtV1 col="12" pr="0" mt={25} mb={22}>
        <LabelHtV1 variant="formHeading" mb="0.875rem">
          Shipping Address
        </LabelHtV1>
      </BoxHtV1>
      <BoxHtV1
        sx={{
          mt: '22px',
          mb: '18px',
          height: '2px',
          width: '100%',
          borderBottom: '1px solid #878686'
        }}
      />
      <RowHtV1 display="block" mr="0" ml="0">
        <BoxHtV1 col="4" width="100%">
          <FormInput
            id="add1"
            label="Address line 1*"
            type="textarea"
            placeholder=""
            onChange={e => onChangeAddress1(formType, e.target.value.replace(/#/g, ''))}
            value={address1}
            feedBackError={addressFeedBackError1}
            feedBackMessage={addressFeedBackMessage1}
            variant="personalDetailsField"
          />
        </BoxHtV1>
        <BoxHtV1 col="4" width="100%">
          <FormInput
            id="add2"
            label="Address line 2"
            type="textarea"
            placeholder=""
            onChange={e => onChangeAddress2(formType, e.target.value.replace(/#/g, ''))}
            value={address2}
            feedBackError={addressFeedBackError2}
            feedBackMessage={addressFeedBackMessage2}
            variant="personalDetailsField"
          />
        </BoxHtV1>
        {/* <BoxHtV1 col="4" pl="10px">
          <FormInput
            id="add3"
            label="Landmark,Village:"
            type="textarea"
            placeholder=""
            onChange={e => onChangeAddress3(formType, e.target.value.replace(/#/g, ''))}
            value={address3}
            feedBackError={addressFeedBackError3}
            feedBackMessage={addressFeedBackMessage3}
            variant="personalDetailsField"
            width="291px"
          />
        </BoxHtV1> */}
      </RowHtV1>
      <RowHtV1 display="block" mr="0" ml="0">
        <BoxHtV1 col="6" pr={10}>
          <FormInput
            label="State *"
            type="text"
            placeholder=""
            value={state}
            feedBackError={stateFeedBackError}
            feedBackMessage={stateFeedBackMessage}
            readOnly
            variant="personalDetailsField"
            width="291px"
          />
        </BoxHtV1>
        <BoxHtV1 col="6">
          <FormInput
            label="City *"
            type="text"
            placeholder=""
            value={city}
            feedBackError={cityFeedBackError}
            feedBackMessage={cityFeedBackMessage}
            readOnly
            variant="personalDetailsField"
            width="291px"
          />
        </BoxHtV1>
      </RowHtV1>
      <RowHtV1 display="block" mr="0" ml="0">
        <BoxHtV1 col="6" pr={10}>
          <Pincode
            id="pincodeId"
            pincode={pincode}
            formType={formType}
            feedBackError={pincodeFeedBackError}
            onChangePincode={onChangePincode}
            feedBackMessage={pincodeFeedBackMessage}
            width="291px"
          />
        </BoxHtV1>
        {formType !== 'billing' && (
          <BoxHtV1 col="6">
            <FormInput
              label="GST"
              type="text"
              placeholder=""
              onChange={e => onChangeGST(formType, e.target.value)}
              value={gst}
              feedBackError={gstFeedBackError}
              feedBackMessage={gstFeedBackMessage}
              variant="personalDetailsField"
              width="291px"
            />
          </BoxHtV1>
        )}
      </RowHtV1>
    </BoxHtV1>
  );
};

AddressForm.defaultProps = {
  formType: '',
  isLoggedIn: false,
  address2: ''
  // address3: ''
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
  // address3: PropTypes.string,
  addressFeedBackError1: PropTypes.bool.isRequired,
  addressFeedBackMessage1: PropTypes.string.isRequired,
  addressFeedBackError2: PropTypes.bool.isRequired,
  addressFeedBackMessage2: PropTypes.string.isRequired,
  // addressFeedBackError3: PropTypes.bool.isRequired,
  // addressFeedBackMessage3: PropTypes.string.isRequired,
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
  // onChangeAddress3: PropTypes.func.isRequired,
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

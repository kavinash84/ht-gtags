import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'redux/modules/address';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';

const onChange = (dispatcher, onChangePincode, loadPincodeDetails, formType) => e => {
  const {
    target: { value }
  } = e;
  dispatcher(formType, value);
  onChangePincode(formType, value);
  if (value.length === 6) loadPincodeDetails(formType, value);
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const Pincode = ({
  onChangePincode,
  loadPincodeDetails,
  setPincodeQuery,
  pincode,
  id,
  feedBackError,
  feedBackMessage,
  formType
}) => (
  <FormInput
    label="Pincode *"
    type="text"
    placeholder=""
    onChange={onChange(setPincodeQuery, onChangePincode, loadPincodeDetails, formType)}
    value={pincode}
    feedBackError={feedBackError}
    feedBackMessage={feedBackMessage}
    id={id}
    variant="input"
  />
);

Pincode.defaultProps = {
  pincode: '',
  id: ''
};

Pincode.propTypes = {
  loadPincodeDetails: PropTypes.func.isRequired,
  setPincodeQuery: PropTypes.func.isRequired,
  onChangePincode: PropTypes.func.isRequired,
  pincode: PropTypes.string,
  feedBackError: PropTypes.bool.isRequired,
  feedBackMessage: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  id: PropTypes.string
};

export default connect(null, mapDispatchToProps)(Pincode);

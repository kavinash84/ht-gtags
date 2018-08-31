import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/address';

const styles = require('./Pincode.scss');

const onChange = (dispatcher, onChangePincode, loadPincodeDetails, formType) => e => {
  const { target: { value } } = e;
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
  feedBackError,
  feedBackMessage,
  formType
}) => (
  <Div className={styles.pincode} pt="0" pb="0.3125rem">
    <FormInput
      label="Pincode"
      type="text"
      placeholder=""
      backgroundColor="#f2f2f2"
      borderColor="rgba(0, 0, 0, 0.03)"
      height="2.5rem"
      onChange={onChange(setPincodeQuery, onChangePincode, loadPincodeDetails, formType)}
      value={pincode}
      feedBackError={feedBackError}
      feedBackMessage={feedBackMessage}
    />
  </Div>
);

Pincode.defaultProps = {
  pincode: ''
};

Pincode.propTypes = {
  loadPincodeDetails: PropTypes.func.isRequired,
  setPincodeQuery: PropTypes.func.isRequired,
  onChangePincode: PropTypes.func.isRequired,
  pincode: PropTypes.string,
  feedBackError: PropTypes.bool.isRequired,
  feedBackMessage: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired
};

export default connect(null, mapDispatchToProps)(Pincode);

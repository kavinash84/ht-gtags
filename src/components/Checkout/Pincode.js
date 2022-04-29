import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'redux/modules/address';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';

const styles = require('./Pincode.scss');
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
    <Div className={styles.checkoutPincode} pt="0" pb="0px">
      <FormInput
        label=""
        type="text"
        placeholder="Pincode *"
        backgroundColor="#fff"
        borderColor="rgba(151,151,151,0.47)"
        height="2.5rem"
        onChange={onChange(setPincodeQuery, onChangePincode, loadPincodeDetails, formType)}
        value={pincode}
        feedBackError={feedBackError}
        feedBackMessage={feedBackMessage}
      />
    </Div>
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

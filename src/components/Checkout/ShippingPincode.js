import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/shipping';

const styles = require('./ShippingPincode.scss');

const onChange = (dispatcher, onChangePincode, load) => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
  onChangePincode(value);
  if (value.length >= 2) load(value);
};

const setPincodeInStore = (dispatcher, loadPincodeDetails, pincode) => e => {
  e.preventDefault();
  loadPincodeDetails(pincode);
  dispatcher(pincode);
};

const mapStateToProps = ({ shipping }) => ({
  ...shipping
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const Pincode = ({
  onChangePincode,
  loadPincodeDetails,
  setPincodeQuery,
  setPincode,
  pincode,
  load,
  loading,
  loaded,
  results,
  showResults,
  pincodeFeedBackError,
  pincodeFeedBackMessage
}) => (
  <Div className={styles.pincode} pt="0" pb="0.3125rem">
    <FormInput
      label="Pincode"
      type="text"
      placeholder=""
      backgroundColor="#f2f2f2"
      borderColor="rgba(0, 0, 0, 0.03)"
      height="2.5rem"
      onChange={onChange(setPincodeQuery, onChangePincode, load)}
      value={pincode}
      feedBackError={pincodeFeedBackError}
      feedBackMessage={pincodeFeedBackMessage}
    />
    <Div className={`${styles.searchList} ${styles.active}`}>
      {loading && (
        <ul>
          <li> Searching.... </li>
        </ul>
      )}
      {loaded &&
        showResults &&
        results.length > 0 && (
        <ul>
          {results.map((item, index) => (
            <li key={String(index)}>
              <button onClick={setPincodeInStore(setPincode, loadPincodeDetails, item.name)}>{item.name}</button>
            </li>
          ))}
        </ul>
      )}
    </Div>
  </Div>
);

Pincode.defaultProps = {
  loading: false,
  loaded: false,
  results: [],
  showResults: false
};

Pincode.propTypes = {
  showResults: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  load: PropTypes.func.isRequired,
  loadPincodeDetails: PropTypes.func.isRequired,
  setPincodeQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  onChangePincode: PropTypes.func.isRequired,
  pincode: PropTypes.string.isRequired,
  pincodeFeedBackError: PropTypes.string.isRequired,
  pincodeFeedBackMessage: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pincode);

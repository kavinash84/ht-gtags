import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from 'hometown-components/lib/Input';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/pincode';

const styles = require('./Pincode.scss');

const onChange = (dispatcher, load) => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
  if (value.length >= 2) load(value);
};

const setPincodeInStore = (dispatcher, pincode, closeModal) => e => {
  e.preventDefault();
  closeModal();
  dispatcher(pincode);
};

const mapStateToProps = ({ pincode }) => ({
  ...pincode
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const Pincode = ({
  setPincodeQuery,
  setPincode,
  pincodeQuery,
  load,
  loading,
  loaded,
  results,
  showResults,
  onCloseModal
}) => (
  <Div className={styles.pincode} pt="0" pb="0.3125rem">
    <Input
      type="text"
      placeholder="Enter Pincode / City"
      backgroundColor="#f2f2f2"
      borderColor="rgba(0, 0, 0, 0.03)"
      height="2.5rem"
      onChange={onChange(setPincodeQuery, load)}
      value={pincodeQuery}
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
              <button onClick={setPincodeInStore(setPincode, item.name, onCloseModal)}>{item.name}</button>
            </li>
          ))}
        </ul>
      )}
    </Div>
  </Div>
);

Pincode.defaultProps = {
  pincodeQuery: '',
  loading: false,
  loaded: false,
  results: [],
  showResults: false
};

Pincode.propTypes = {
  pincodeQuery: PropTypes.string,
  showResults: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  load: PropTypes.func.isRequired,
  setPincodeQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pincode);

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
  setPincodeOrCityQuery,
  setPincode,
  pincodeQuery,
  load,
  loading,
  loaded,
  results,
  showResults,
  onCloseModal,
  color
}) => (
  <Div className={styles.pincode} pt="0" pb="0.3125rem">
    <Input
      type="text"
      placeholder="Enter Pincode / City"
      backgroundColor={color}
      borderColor="rgba(0, 0, 0, 0.03)"
      height="2.5rem"
      onChange={onChange(setPincodeOrCityQuery, load)}
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
  showResults: false,
  color: '#fff'
};

Pincode.propTypes = {
  pincodeQuery: PropTypes.string,
  showResults: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  load: PropTypes.func.isRequired,
  setPincodeOrCityQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  color: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pincode);

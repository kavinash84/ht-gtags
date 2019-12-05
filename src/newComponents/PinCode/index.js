import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* ====== Modules ====== */
import * as actionCreators from 'redux/modules/pincode';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import UlHtV1 from 'hometown-components-dev/lib/UlHtV1';
import LiHtV1 from 'hometown-components-dev/lib/LiHtV1';
import InputFieldHtV1 from 'hometown-components-dev/lib/InputFieldHtV1';

const styles = require('./Pincode.scss');

// const NO_RELOAD = ['/checkout/cart'];

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
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

const mapStateToProps = ({ pincode }) => ({
  ...pincode
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const PinCode = ({
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
  <BoxHtV1 className={styles.pincode} pt="0" pb="0.3125rem">
    <InputFieldHtV1
      type="text"
      placeholder="Enter Pincode / City"
      backgroundColor={color}
      borderColor="rgba(0, 0, 0, 0.03)"
      height="2.5rem"
      onChange={onChange(setPincodeOrCityQuery, load)}
      value={pincodeQuery}
    />
    <BoxHtV1 className={`${styles.searchList} ${styles.active}`}>
      {loading && (
        <UlHtV1>
          <LiHtV1> Searching.... </LiHtV1>
        </UlHtV1>
      )}
      {loaded && showResults && results.length > 0 && (
        <UlHtV1>
          {results.map((item, index) => (
            <LiHtV1 key={String(index)}>
              <button onClick={setPincodeInStore(setPincode, item.name, onCloseModal)}>{item.name}</button>
            </LiHtV1>
          ))}
        </UlHtV1>
      )}
    </BoxHtV1>
  </BoxHtV1>
);

PinCode.defaultProps = {
  pincodeQuery: '',
  loading: false,
  loaded: false,
  results: [],
  showResults: false,
  color: '#fff'
};

PinCode.propTypes = {
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
)(PinCode);

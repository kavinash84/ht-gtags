import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputFieldHtV1 from 'hometown-components-dev/lib/InputFieldHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import * as actionCreators from 'redux/modules/pincode';
import { pincode as pincodeCheck } from 'utils/validation';
import { getDelieveryInfo } from 'redux/modules/productdetails';

const styles = require('./Pincode.scss');
const location = require('../../../static/map-icon.svg');

const onChange = dispatcher => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
};

const mapStateToProps = ({ pincode, productdetails }) => ({
  ...pincode,
  simpleSku: productdetails.simpleSku
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionCreators, deliveryInfo: getDelieveryInfo }, dispatch);

class Pincode extends React.Component {
  state = {
    validationError: false,
    validationErrorMessage: 'Please Enter Valid Pincode'
  };

  setPincodeInStore = (dispatcher, pincode) => e => {
    e.preventDefault();
    const { simpleSku, deliveryInfo } = this.props;
    this.setState(
      {
        validationError: pincodeCheck(pincode)
      },
      () => {
        if (!this.state.validationError) {
          dispatcher(pincode);
          deliveryInfo(simpleSku, pincode);
        }
      }
    );
  };

  render() {
    const { setPincodeQuery, setPincode, pincodeQuery } = this.props;
    const { validationError, validationErrorMessage } = this.state;
    return (
      <BoxHtV1 className={styles.pdpPincode} padding="0 0 0.3125rem">
        <form onSubmit={this.setPincodeInStore(setPincode, pincodeQuery)}>
          <ImageHtV1
            width="initial"
            height="1.5em"
            marginRight="0.625rem"
            marginTop="0"
            float="left"
            src={location}
            className={styles.pincodeIcon}
          />
          <InputFieldHtV1
            type="text"
            placeholder="Enter Pincode"
            backgroundColor="transparent"
            borderColor="rgb(202, 202, 202)"
            height="2.5rem"
            onChange={onChange(setPincodeQuery, this.setPincodeInStore(setPincode, pincodeQuery))}
            value={pincodeQuery}
          />
          <button className={styles.pincodeCheckBtn} onClick={this.setPincodeInStore(setPincode, pincodeQuery)}>
            Go
          </button>
        </form>
        {validationError && <BoxHtV1>{validationErrorMessage}</BoxHtV1>}
      </BoxHtV1>
    );
  }
}

Pincode.defaultProps = {
  pincodeQuery: '',
  simpleSku: ''
};

Pincode.propTypes = {
  pincodeQuery: PropTypes.string,
  setPincodeQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  deliveryInfo: PropTypes.func.isRequired,
  simpleSku: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Pincode);

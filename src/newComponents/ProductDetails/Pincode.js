import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import InputField from 'hometown-components-dev/lib/InputFieldHtV1';

/**
 * Modules / Utils
 */
import * as actionCreators from 'redux/modules/pincode';
import { pincode as pincodeCheck } from 'utils/validation';
import { getDelieveryInfo } from 'redux/modules/productdetails';

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
      <Box
        sx={{
          position: 'relative'
        }}
      >
        <form onSubmit={this.setPincodeInStore(setPincode, pincodeQuery)}>
          <Image
            float="left"
            src={location}
            sx={{
              position: 'absolute',
              top: 10,
              left: 8
            }}
          />
          <InputField
            type="text"
            placeholder="Enter Pincode"
            backgroundColor="transparent"
            borderColor="rgb(202, 202, 202)"
            height={44}
            my={0}
            pl={40}
            borderRadius={0}
            color="primary"
            fontSize={16}
            onChange={onChange(setPincodeQuery, this.setPincodeInStore(setPincode, pincodeQuery))}
            value={pincodeQuery}
          />
          <Button
            variant="secondary"
            fontFamily="medium"
            height={44}
            onClick={this.setPincodeInStore(setPincode, pincodeQuery)}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0
            }}
          >
            Go
          </Button>
        </form>
        {validationError && <Box>{validationErrorMessage}</Box>}
      </Box>
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

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import InputField from 'hometown-components-dev/lib/InputFieldHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import LocationIcon from 'hometown-components-dev/lib/Icons/LocationHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/**
 * Modules / Utils
 */
import * as actionCreators from 'redux/modules/pincode';
import { pincode as pincodeCheck } from 'utils/validation';
import { getDelieveryInfo } from 'redux/modules/productdetails';

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
      <Box width={1}>
        <form onSubmit={this.setPincodeInStore(setPincode, pincodeQuery)}>
          <Row alignItems="center" mx={0} width={1}>
            <Text color="textFilter" fontSize={16} sx={{ display: 'flex', alignItems: 'center' }} pr={10}>
              <LocationIcon color="bgPrimary" height={28} width={28} mr={5} ml={-7} />
              For delivery details
            </Text>
            <Box width="55%" sx={{ position: 'relative' }}>
              <InputField
                type="text"
                variant="input"
                placeholder="Enter Pincode"
                height={44}
                my={0}
                onChange={onChange(setPincodeQuery, this.setPincodeInStore(setPincode, pincodeQuery))}
                value={pincodeQuery}
                sx={{
                  borderRadius: 0,
                  '&::-webkit-input-placeholder': {
                    color: '#f15a22'
                  }
                }}
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
            </Box>
          </Row>
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

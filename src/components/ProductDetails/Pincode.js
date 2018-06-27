import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from 'hometown-components/lib/Input';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/pincode';
import { pincode as pincodeCheck } from 'utils/validation';
import { loadProductDescription } from 'redux/modules/productdetails';

const styles = require('./Pincode.scss');

const onChange = dispatcher => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
};

const mapStateToProps = ({ pincode, productdetails }) => ({
  ...pincode,
  currentsku: productdetails.currentsku
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionCreators, loadDescription: loadProductDescription }, dispatch);

class Pincode extends React.Component {
  state = {
    validationError: false,
    validationErrorMessage: 'Please Enter Valid Pincode'
  };

  setPincodeInStore = (dispatcher, pincode) => e => {
    e.preventDefault();
    const { currentsku, loadDescription } = this.props;
    this.setState(
      {
        validationError: pincodeCheck(pincode)
      },
      () => {
        if (!this.state.validationError) {
          dispatcher(pincode);
          loadDescription(currentsku, pincode);
        }
      }
    );
  };

  render() {
    const { setPincodeQuery, setPincode, pincodeQuery } = this.props;
    const { validationError, validationErrorMessage } = this.state;
    return (
      <Div className={styles.pincode} pt="0" pb="0.3125rem">
        <Input
          type="text"
          placeholder="Search"
          backgroundColor="rgba(0, 0, 0, 0.05)"
          borderColor="rgba(0, 0, 0, 0.03)"
          height="2.5rem"
          onChange={onChange(setPincodeQuery)}
          value={pincodeQuery}
        />
        <button onClick={this.setPincodeInStore(setPincode, pincodeQuery)}>CHECK</button>
        {validationError && <div>{validationErrorMessage}</div>}
      </Div>
    );
  }
}

Pincode.defaultProps = {
  pincodeQuery: '',
  currentsku: ''
};

Pincode.propTypes = {
  pincodeQuery: PropTypes.string,
  setPincodeQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  loadDescription: PropTypes.func.isRequired,
  currentsku: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pincode);

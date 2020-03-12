import React, { Component } from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Button from 'hometown-components/lib/Buttons';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import { validateVPA } from 'utils/validation';

const styles = require('./Checkout.scss');

const mapStateToProps = ({ paymentoptions }) => ({
  details: paymentoptions.paymentMethodDetails[paymentoptions.selectedGateway],
  selectedGateway: paymentoptions.selectedGateway
});

class UpiForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vpaError: false,
      vpaErrorMsg: '!Please enter valid UPI Id'
    };
  }
  onChangeDetails = (dispatcher, gateway) => e => {
    e.preventDefault();
    const { name, value } = e.target;
    const isValid = !validateVPA(value);
    this.setState({
      vpaError: isValid
    });
    dispatcher({ gateway, data: { [name]: value } });
  };
  render() {
    const {
      padding,
      setPaymentDetails,
      gateway,
      details: { upi_vpa: vpa }
    } = this.props;
    const { vpaError, vpaErrorMsg } = this.state;
    return (
      <Box className={styles.paymentBlock} p={padding}>
        <Box width={9 / 12} pr="1rem">
          <FormInput
            label="Please enter your UPI ID"
            type="text"
            placeholder="Ex: MobileNumber@upi"
            value={vpa}
            name="upi_vpa"
            onChange={this.onChangeDetails(setPaymentDetails, gateway)}
          />
          {vpaError && <p style={{ color: 'red' }}> {vpaErrorMsg} </p>}
        </Box>
        {/* <Box col="12">
          <Button
            btnType="primary"
            fontFamily="regular"
            height="40px"
            fontSize="14px"
            p="10px 20px"
            lh="1"
            borderRadius="0"
          >
            Pay Now
          </Button>
        </Box> */}
      </Box>
    );
  }
}

UpiForm.defaultProps = {
  padding: '3.5rem 2rem'
};

UpiForm.propTypes = {
  padding: PropTypes.string,
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired
};
export default connect(mapStateToProps, null)(UpiForm);

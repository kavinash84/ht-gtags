import React from 'react';
import Div from 'hometown-components/lib/Div';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Button from 'hometown-components/lib/Buttons';
import FormInput from 'hometown-components/lib/Forms/FormInput';

const styles = require('./Checkout.scss');

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const mapStateToProps = ({ paymentoptions }) => ({
  details: paymentoptions.paymentMethodDetails[paymentoptions.selectedGateway],
  selectedGateway: paymentoptions.selectedGateway
});

const UpiForm = ({
  padding, setPaymentDetails, gateway, details: { upi_vpa: vpa }
}) => (
  <Div className={styles.paymentBlock} p={padding}>
    <Div col="9" pr="1rem">
      <FormInput
        label="Enter your VPA"
        type="text"
        placeholder=""
        value={vpa}
        name="upi_vpa"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
      />
    </Div>
    {/* <Div col="12">
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
    </Div> */}
  </Div>
);

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

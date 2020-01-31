import React from 'react';
import Div from 'hometown-components/lib/Div';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';
import FormInput from 'hometown-components/lib/Forms/FormInput';

const styles = require('./Checkout.scss');

const UpiForm = ({ padding }) => (
  <Div className={styles.paymentBlock} p={padding}>
    <Div col="9" pr="1rem">
      <FormInput label="Enter your VPA" type="text" placeholder="" value="" name="vpa" />
    </Div>
    <Div col="12">
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
    </Div>
  </Div>
);

UpiForm.defaultProps = {
  padding: '3.5rem 2rem'
};

UpiForm.propTypes = {
  padding: PropTypes.string
};
export default UpiForm;

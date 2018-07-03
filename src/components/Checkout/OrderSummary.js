import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Span from 'hometown-components/lib/Span';
import Button from 'hometown-components/lib/Buttons';
import { formatAmount } from 'utils/formatters';

const styles = require('./Checkout.scss');

const OrderSummary = ({
  itemsTotal, savings, shipping, totalCart
}) => (
  <Div col="3">
    <Div className={styles.orderSummary}>
      <Heading fontSize="0.875em" mb="0.625rem" color="secondary">
        ORDER SUMMARY
      </Heading>
      <Div col="12">
        <Text color="rgba(0, 0, 0, 0.8);">
          Items
          <Span float="right" color="#000000" fontWeight="500">
            Rs. {formatAmount(itemsTotal)}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Savings
          <Span float="right" color="#000000" fontWeight="500">
            Rs. {formatAmount(savings)}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Shipping
          <Span float="right" color="#000000" fontWeight="500">
            {shipping === 0 ? 'Free' : shipping}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Total
          <Span float="right" color="#000000" fontWeight="500">
            Rs. {formatAmount(totalCart)}
          </Span>
        </Text>
      </Div>
      <Div col="12" mt="0.625rem">
        <Button btnType="link" color="#ae8873" fontWeight="Light" pl="0" pr="0" fontSize="0.875rem">
          Got a coupon?
        </Button>
      </Div>
      <Div col="12">
        <Button btnType="link" color="#ae8873" fontWeight="Light" pl="0" pr="0" pt="0" fontSize="0.875rem">
          Redeem your points?
        </Button>
      </Div>
      <Div col="12" mt="0">
        <Button
          size="block"
          btnType="primary"
          height="42px"
          mt="0.625rem"
          fontWeight="Light"
          fontSize="0.875rem"
          ls="1px"
        >
          CONTINUE
        </Button>
      </Div>
    </Div>
    <Div className={styles.questions}>
      <Text color="rgba(0, 0, 0, 0.5)" fontSize="0.875rem" fontWeight="600">
        Do you have Questions about your Order?
      </Text>
      <Text color="#646464" fontWeight="300">
        Call us: 18002100004 <br />
        E Mail: care@hometown.in
      </Text>
    </Div>
  </Div>
);

OrderSummary.propTypes = {
  itemsTotal: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  totalCart: PropTypes.number.isRequired
};

export default OrderSummary;

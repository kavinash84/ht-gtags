import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Span from 'hometown-components/lib/Span';
import Button from 'hometown-components/lib/Buttons';
import { formatAmount } from 'utils/formatters';
import Coupon from './Coupon';

const styles = require('./OrderSummary.scss');

const OrderSummary = ({
  itemsTotal,
  savings,
  shipping,
  totalCart,
  onClick,
  loadingnextstep,
  hidebutton,
  itemsCount,
  isSubmitted,
  outOfStockList
}) => (
  <Div col="3">
    <Div className={styles.orderSummary}>
      <Heading fontSize="0.875em" mb="0.625rem" color="secondary">
        ORDER SUMMARY
      </Heading>
      <Div col="12">
        <Text color="rgba(0, 0, 0, 0.8);">
          Total Price ({itemsCount} item{itemsCount === 1 ? '' : 's'})
          <Span float="right" color="#000000" fontFamily="medium">
            Rs. {itemsTotal ? formatAmount(itemsTotal) : null}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Savings
          <Span float="right" color="#000000" fontFamily="medium">
            Rs. {savings ? formatAmount(savings) : 0}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Shipping
          <Span float="right" color="#000000" fontFamily="medium">
            {shipping === 0 ? 'Free' : shipping}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Total
          <Span float="right" color="#000000" fontFamily="medium">
            Rs. {totalCart ? formatAmount(totalCart) : null}
          </Span>
        </Text>
      </Div>
      <Div col="12" mt="0.625rem">
        <Coupon />
      </Div>
      <Div col="12" mt="0.625rem">
        {!hidebutton && (
          <Button
            size="block"
            btnType="primary"
            height="42px"
            mt="0.625rem"
            fontFamily="Light"
            fontSize="0.875rem"
            ls="1px"
            onClick={onClick}
            hide={hidebutton}
            disabled={loadingnextstep || isSubmitted || (outOfStockList && outOfStockList.length > 0)}
          >
            {loadingnextstep || isSubmitted ? 'Please wait...' : 'CONTINUE'}
          </Button>
        )}
      </Div>
    </Div>
    <Div className={styles.questions}>
      <Text color="rgba(0, 0, 0, 0.5)" fontSize="0.875rem" fontFamily="medium">
        Do you have Questions about your Order?
      </Text>
      <Text color="#646464" fontFamily="regular">
        Call us: 18002100004 <br />
        E Mail: care@hometown.in
      </Text>
    </Div>
  </Div>
);

OrderSummary.defaultProps = {
  loadingnextstep: false,
  hidebutton: false,
  itemsCount: 0,
  isSubmitted: false,
  outOfStockList: []
};

OrderSummary.propTypes = {
  itemsTotal: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  totalCart: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  loadingnextstep: PropTypes.bool,
  hidebutton: PropTypes.bool,
  itemsCount: PropTypes.number,
  isSubmitted: PropTypes.bool,
  outOfStockList: PropTypes.array
};

export default OrderSummary;

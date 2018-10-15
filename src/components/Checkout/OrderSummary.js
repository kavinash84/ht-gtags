import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Span from 'hometown-components/lib/Span';
import Button from 'hometown-components/lib/Buttons';
import Theme from 'hometown-components/lib/Theme';
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
  disabled,
  outOfStockList,
  discount
}) => (
  <Row ml="0" mr="0">
    <Div col="12" mb="0.625rem">
      <Coupon />
    </Div>
    <Div col="12" className={styles.orderSummary}>
      <Text color="#6e6e6e" mt="0">
        Total Price ({itemsCount} item{itemsCount === 1 ? '' : 's'})
        <Span float="right" color={Theme.colors.text}>
          Rs. {itemsTotal ? formatAmount(itemsTotal) : null}
        </Span>
      </Text>
      <Text color="#6e6e6e">
        Savings
        <Span float="right" color={Theme.colors.text}>
          Rs. {savings ? formatAmount(savings) : 0}
        </Span>
      </Text>
      <Text color="#6e6e6e">
        Shipping
        <Span float="right" color={Theme.colors.text}>
          {shipping === 0 ? 'Free' : `Rs. ${shipping}`}
        </Span>
      </Text>
      {discount > 0 && (
        <Text color="#6e6e6e">
          Discount
          <Span float="right" color={Theme.colors.text}>
            Rs. {` -${formatAmount(Number(discount))}`}
          </Span>
        </Text>
      )}
      <Text color="#6e6e6e" mb="0" fontSize="2rem" className={styles.totalWrapper} fontFamily="light">
        Total
        <Span float="right" color={Theme.colors.text} mt="10px" fontSize="1.25rem">
          Rs. {totalCart ? formatAmount(totalCart) : null}
        </Span>
      </Text>
      <Text color="rgba(0,0,0,0.4)" mt="-5px" mb="0.3125rem">
        (inclusive of all taxes)
      </Text>
    </Div>
    <Div col="12" mt="0">
      {!hidebutton && (
        <Button
          size="block"
          btnType="primary"
          height="42px"
          mt="0"
          fontFamily="Light"
          fontSize="1.125rem"
          ls="1px"
          onClick={onClick}
          hide={hidebutton}
          borderRadius="0"
          disabled={loadingnextstep || isSubmitted || (outOfStockList && outOfStockList.length > 0) || disabled}
        >
          {loadingnextstep || isSubmitted ? 'Please wait...' : 'Place Order'}
        </Button>
      )}
    </Div>
  </Row>
);

OrderSummary.defaultProps = {
  loadingnextstep: false,
  hidebutton: false,
  itemsCount: 0,
  isSubmitted: false,
  outOfStockList: [],
  disabled: false,
  discount: 0
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
  outOfStockList: PropTypes.array,
  disabled: PropTypes.bool,
  discount: PropTypes.number
};

export default OrderSummary;

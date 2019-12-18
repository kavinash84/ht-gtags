import React from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import { formatAmount } from 'utils/formatters';
import Coupon from './Coupon';

const styles = require('./OrderSummary.scss');

const OrderSummary = ({
  itemsTotal,
  savings,
  setDiscount,
  shipping,
  totalCart,
  onClick,
  loadingnextstep,
  hidebutton,
  itemsCount,
  isSubmitted,
  disabled,
  outOfStockList,
  discount,
  btnText,
  hidecoupon
}) => (
  <RowHtV1 ml="0" mr="0">
    <BoxHtV1 col="12" mb="1.25rem">
      {!hidecoupon && <Coupon />}
    </BoxHtV1>
    <BoxHtV1 col="12" className={styles.orderSummary}>
      <TextHtV1 color="#6e6e6e" mt="0">
        Total Price ({itemsCount} item
        {itemsCount === 1 ? '' : 's'})
        <BoxHtV1 float="right" color="rgba(51, 51, 51, 0.85)">
          Rs. {itemsTotal ? formatAmount(itemsTotal) : null}
        </BoxHtV1>
      </TextHtV1>
      <TextHtV1 color="#6e6e6e">
        Savings
        <BoxHtV1 float="right" color="rgba(51, 51, 51, 0.85)">
          Rs. {savings ? formatAmount(savings) : 0}
        </BoxHtV1>
      </TextHtV1>
      <TextHtV1 color="#6e6e6e">
        Shipping
        <BoxHtV1 float="right" color="rgba(51, 51, 51, 0.85)">
          {shipping === 0 ? 'Free' : `Rs. ${shipping}`}
        </BoxHtV1>
      </TextHtV1>
      {discount > 0 && (
        <TextHtV1 color="#6e6e6e">
          Discount
          <BoxHtV1 float="right" color="rgba(51, 51, 51, 0.85)">
            Rs. {` ${formatAmount(Number(discount))}`}
          </BoxHtV1>
        </TextHtV1>
      )}
      {setDiscount > 0 && (
        <TextHtV1 color="#6e6e6e">
          Combo Discount
          <BoxHtV1 float="right" color="rgba(51, 51, 51, 0.85)">
            Rs. {` ${formatAmount(Number(setDiscount))}`}
          </BoxHtV1>
        </TextHtV1>
      )}
      <TextHtV1 color="#6e6e6e" mb="0" fontSize="2rem" className={styles.totalWrapper} fontFamily="light">
        Total
        <BoxHtV1 float="right" color="rgba(51, 51, 51, 0.85)" mt="10px" fontSize="1.25rem">
          Rs. {totalCart ? formatAmount(totalCart) : null}
        </BoxHtV1>
      </TextHtV1>
      <TextHtV1 color="rgba(0,0,0,0.4)" mt="-5px" mb="0.3125rem">
        (inclusive of all taxes)
      </TextHtV1>
    </BoxHtV1>
    <BoxHtV1 col="12" mt="0">
      {!hidebutton && (
        <ButtonHtV1
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
          {loadingnextstep || isSubmitted ? 'Please wait...' : btnText}
        </ButtonHtV1>
      )}
    </BoxHtV1>
  </RowHtV1>
);

OrderSummary.defaultProps = {
  loadingnextstep: false,
  hidebutton: false,
  itemsCount: 0,
  isSubmitted: false,
  outOfStockList: [],
  disabled: false,
  discount: 0,
  btnText: 'Place Order',
  hidecoupon: false,
  setDiscount: 0
};

OrderSummary.propTypes = {
  itemsTotal: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  setDiscount: PropTypes.number,
  shipping: PropTypes.number.isRequired,
  totalCart: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  loadingnextstep: PropTypes.bool,
  hidebutton: PropTypes.bool,
  itemsCount: PropTypes.number,
  isSubmitted: PropTypes.bool,
  outOfStockList: PropTypes.array,
  disabled: PropTypes.bool,
  discount: PropTypes.number,
  btnText: PropTypes.string,
  hidecoupon: PropTypes.bool
};

export default OrderSummary;

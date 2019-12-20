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
    <BoxHtV1 variant="col-12" mb="1.25rem">
      {!hidecoupon && <Coupon />}
    </BoxHtV1>
    <BoxHtV1 variant="col-12" className={styles.orderSummary}>
      <RowHtV1 m="0" mb="1.5em">
        <BoxHtV1 variant="col-6" p="0">
          <TextHtV1 color="heading" mt="0">
            Total Price ({itemsCount} item
            {itemsCount === 1 ? '' : 's'})
          </TextHtV1>
        </BoxHtV1>
        <BoxHtV1 variant="col-6" p="0" textAlign="right">
          <TextHtV1 color="heading">Rs. {itemsTotal ? formatAmount(itemsTotal) : null}</TextHtV1>
        </BoxHtV1>
      </RowHtV1>
      <RowHtV1 m="0" mb="1.5em">
        <BoxHtV1 variant="col-6" p="0">
          <TextHtV1 color="heading" mt="0">
            Savings
          </TextHtV1>
        </BoxHtV1>
        <BoxHtV1 variant="col-6" p="0" textAlign="right">
          <TextHtV1 color="heading">Rs. {savings ? formatAmount(savings) : 0}</TextHtV1>
        </BoxHtV1>
      </RowHtV1>
      <RowHtV1 m="0" mb="1.5em">
        <BoxHtV1 variant="col-6" p="0">
          <TextHtV1 color="heading" mt="0">
            Shipping
          </TextHtV1>
        </BoxHtV1>
        <BoxHtV1 variant="col-6" p="0" textAlign="right">
          <TextHtV1 color="heading">{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</TextHtV1>
        </BoxHtV1>
      </RowHtV1>

      {discount > 0 && (
        <RowHtV1 m="0" mb="1.5em">
          <BoxHtV1 variant="col-6" p="0">
            <TextHtV1 color="heading" mt="0">
              Discount
            </TextHtV1>
          </BoxHtV1>
          <BoxHtV1 variant="col-6" p="0" textAlign="right">
            <TextHtV1 color="heading">Rs. {` ${formatAmount(Number(discount))}`}</TextHtV1>
          </BoxHtV1>
        </RowHtV1>
      )}
      {setDiscount > 0 && (
        <RowHtV1 m="0" mb="1.5em">
          <BoxHtV1 variant="col-6" p="0">
            <TextHtV1 color="heading" mt="0">
              Combo Discount
            </TextHtV1>
          </BoxHtV1>
          <BoxHtV1 variant="col-6" p="0" textAlign="right">
            <TextHtV1 color="heading">Rs. {` ${formatAmount(Number(setDiscount))}`}</TextHtV1>
          </BoxHtV1>
        </RowHtV1>
      )}
      <RowHtV1 m="0" py="1em" className={styles.totalWrapper}>
        <BoxHtV1 variant="col-6" p="0">
          <TextHtV1 color="menuItem" mb="0" fontSize="19px" fontWeight="600" fontFamily="light">
            Total
          </TextHtV1>
        </BoxHtV1>
        <BoxHtV1 variant="col-6" p="0" textAlign="right">
          <TextHtV1 color="menuItem" fontSize="19px" fontWeight="600">
            Rs. {totalCart ? formatAmount(totalCart) : null}
          </TextHtV1>
        </BoxHtV1>
      </RowHtV1>
      <TextHtV1 color="rgba(0,0,0,0.4)" mt="-5px" mb="0.3125rem">
        (inclusive of all taxes)
      </TextHtV1>
    </BoxHtV1>
    <BoxHtV1 variant="col-12" mt="0">
      {!hidebutton && (
        <ButtonHtV1
          size="block"
          btnType="primary"
          height="42px"
          mt="0"
          fontFamily="Light"
          fontSize="1.125rem"
          ls="1px"
          width="100%"
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

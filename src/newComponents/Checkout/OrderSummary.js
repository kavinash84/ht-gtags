import React from 'react';
import PropTypes from 'prop-types';

/**
 * formatters
 */
import { formatAmount } from 'utils/formatters';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Coupon from './Coupon';
import AcceptedPaymentOptions from '../AcceptedPaymentOptions';
import ProductSummaryList from './ProductSummaryList';

/**
 * Icons
 */
const checkoutIcon = require('../../../static/checkout.svg');
const editIcon = require('../../../static/edit-round.svg');

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
  hidecoupon,
  hideProductSummary
}) => (
  <Row>
    <Col width={1}>
      <Box
        pb={10}
        sx={{
          borderBottom: 'divider'
        }}
      >
        <Heading variant="heading.regular" color="#1c1c1c" display="flex" justifyContent="space-between">
          Order Summary
          <Image src={editIcon} alt="edit" />
        </Heading>
        <Text>Total Items : 3</Text>
      </Box>
    </Col>
    {/* Coupons / List */}
    <Box variant="col-12" mb="1.25rem">
      {!hidecoupon && <Coupon />}
    </Box>
    {/* Products */}
    {!hideProductSummary && (
      <Box
        mb={20}
        sx={{
          borderBottom: 'divider'
        }}
      >
        <ProductSummaryList />
        <ProductSummaryList />
        <ProductSummaryList />
      </Box>
    )}
    <Box variant="col-12" pb={20}>
      <Flex mb={20} justifyContent="space-between">
        <Text>
          Total Price ({itemsCount} item
          {itemsCount === 1 ? '' : 's'})
        </Text>
        <Text>Rs. {itemsTotal ? formatAmount(itemsTotal) : null}</Text>
      </Flex>
      <Flex mb={20} justifyContent="space-between">
        <Text>Savings</Text>
        <Text>Rs. {savings ? formatAmount(savings) : 0}</Text>
      </Flex>
      <Flex mb={20} justifyContent="space-between">
        <Text>Shipping</Text>
        <Text>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</Text>
      </Flex>
      {discount > 0 && (
        <Flex mb={20} justifyContent="space-between">
          <Text>Discount</Text>
          <Text>Rs. {` ${formatAmount(Number(discount))}`}</Text>
        </Flex>
      )}
      {setDiscount > 0 && (
        <Flex mb={20} justifyContent="space-between">
          <Text>Combo Discount</Text>
          <Text>Rs. {` ${formatAmount(Number(setDiscount))}`}</Text>
        </Flex>
      )}
      <Row m="0" py="1em" className={styles.totalWrapper}>
        <Box variant="col-6" p="0">
          <Text color="menuItem" mb="0" fontSize="19px" fontWeight="600" fontFamily="light">
            Total
          </Text>
        </Box>
        <Box variant="col-6" p="0" textAlign="right">
          <Text color="menuItem" fontSize="19px" fontWeight="600">
            Rs. {totalCart ? formatAmount(totalCart) : null}
          </Text>
        </Box>
      </Row>
      <Text color="rgba(0,0,0,0.4)" mt="-5px" mb="0.3125rem">
        (inclusive of all taxes)
      </Text>
    </Box>
    {!hidebutton && <AcceptedPaymentOptions />}
    {!hidebutton && (
      <Box variant="col-12" pb={20}>
        <Button
          width={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="auto"
          onClick={onClick}
          hide={hidebutton}
          disabled={loadingnextstep || isSubmitted || (outOfStockList && outOfStockList.length > 0) || disabled}
        >
          <Image src={checkoutIcon} alt="Delete" height="20px" mr="0.625rem" />
          {loadingnextstep || isSubmitted ? 'Please wait...' : btnText}
        </Button>
      </Box>
    )}
  </Row>
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
  hideProductSummary: false,
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
  hidecoupon: PropTypes.bool,
  hideProductSummary: PropTypes.bool
};

export default OrderSummary;

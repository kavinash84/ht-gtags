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
import Col from 'hometown-components-dev/lib/ColHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import ProductSummaryList from './ProductSummaryList';

const editIcon = require('../../../static/edit-round.svg');

const styles = require('./OrderSummary.scss');

const editItems = history => history.push('/checkout/cart');

const OrderSummary = ({
  itemsTotal,
  savings,
  setDiscount,
  shipping,
  totalCart,
  itemsCount,
  discount,
  coupon,
  results,
  history
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
          <Image
            sx={{ cursor: 'pointer' }}
            src={editIcon}
            onClick={e => {
              e.preventDefault();
              editItems(history);
            }}
            alt="edit"
          />
        </Heading>
        <Text>{`Total Items: ${itemsCount}`}</Text>
      </Box>
    </Col>
    {/* Products */}
    <Box
      mb={20}
      mt={20}
      width={1}
      sx={{
        borderBottom: 'divider'
      }}
    >
      {results.map(item => (
        <ProductSummaryList sku={item.configurable_sku} qty={item.qty} productItem={item.product_info || {}} />
      ))}
    </Box>
    <Box variant="col-12" pb={20}>
      {coupon && (
        <Flex mb={20} justifyContent="space-between">
          <Text color="red">Promo code {coupon.toUpperCase()} applied</Text>
        </Flex>
      )}
      <Flex mb={20} justifyContent="space-between">
        <Text>Subtotal</Text>
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
            Total Price
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
  </Row>
);

OrderSummary.defaultProps = {
  itemsCount: 0,
  discount: 0,
  setDiscount: 0,
  results: []
};

OrderSummary.propTypes = {
  itemsTotal: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  setDiscount: PropTypes.number,
  shipping: PropTypes.number.isRequired,
  totalCart: PropTypes.number.isRequired,
  itemsCount: PropTypes.number,
  discount: PropTypes.number,
  coupon: PropTypes.string.isRequired,
  results: PropTypes.array,
  history: PropTypes.object.isRequired
};

export default OrderSummary;

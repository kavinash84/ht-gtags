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

const TextRegular = props => <Text fontSize={[14, 14, 14, 16]} {...props} />;

const OrderSummary = ({
  itemsTotal,
  savings,
  setDiscount,
  shipping,
  totalCart,
  itemsCount,
  discount,
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
        <Heading
          variant="heading.regular"
          fontSize={[18, 18, 20, 24]}
          color="#1c1c1c"
          display="flex"
          justifyContent="space-between"
        >
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
        <TextRegular>{`Total Items: ${itemsCount}`}</TextRegular>
      </Box>
    </Col>
    {/* Products */}
    {results.map(item => (
      <Col width={1}>
        <Box
          mt={20}
          sx={{
            borderBottom: 'divider'
          }}
        >
          <ProductSummaryList sku={item.configurable_sku} qty={item.qty} productItem={item.product_info || {}} />
        </Box>
      </Col>
    ))}
    <Box variant="col-12" pt={20} pb={20}>
      <Flex mb={20} justifyContent="space-between">
        <TextRegular>Subtotal</TextRegular>
        <TextRegular>Rs. {itemsTotal ? formatAmount(itemsTotal) : null}</TextRegular>
      </Flex>
      <Flex mb={20} justifyContent="space-between">
        <TextRegular>Savings</TextRegular>
        <TextRegular>Rs. {savings ? formatAmount(savings) : 0}</TextRegular>
      </Flex>
      <Flex mb={20} justifyContent="space-between">
        <TextRegular>Shipping</TextRegular>
        <TextRegular>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</TextRegular>
      </Flex>
      {discount > 0 && (
        <Flex mb={20} justifyContent="space-between">
          <TextRegular>Discount</TextRegular>
          <TextRegular>Rs. {` ${formatAmount(Number(discount))}`}</TextRegular>
        </Flex>
      )}
      {setDiscount > 0 && (
        <Flex mb={20} justifyContent="space-between">
          <TextRegular>Combo Discount</TextRegular>
          <TextRegular>Rs. {` ${formatAmount(Number(setDiscount))}`}</TextRegular>
        </Flex>
      )}
      <Row m="0" py="1em" className={styles.totalWrapper}>
        <Box variant="col-6" p="0">
          <Text color="menuItem" mb="0" fontSize={[16, 16, 16, 18]} fontWeight={600} fontFamily="light">
            Total Price
          </Text>
        </Box>
        <Box variant="col-6" p="0" textAlign="right">
          <Text color="menuItem" fontSize={[16, 16, 16, 18]} fontWeight={600}>
            Rs. {totalCart ? formatAmount(totalCart) : null}
          </Text>
        </Box>
      </Row>
      <TextRegular color="rgba(0,0,0,0.4)" mt="-5px" mb="0.3125rem">
        (inclusive of all taxes)
      </TextRegular>
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
  results: PropTypes.array,
  history: PropTypes.object.isRequired
};

export default OrderSummary;

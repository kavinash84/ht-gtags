import React from 'react';
import PropTypes from 'prop-types';

import { formatAmount } from 'utils/formatters';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const ProductSummaryList = ({ productItem, qty }) => (
  <Flex py={10} sx={{ borderBottom: 'divider' }}>
    <Box variant="col-4" pr={0} pl={0}>
      <Image
        width={1}
        src={productItem.image || ''}
        alt=""
        sx={{
          boxShadow: 'productThumb'
        }}
      />
    </Box>
    <Box variant="col-8" pl={10} pr={0}>
      <Box mb="10px">
        <Heading color="heading" fontSize={[12, 12, 12, 14]} lineHeight={1.4} pb={5}>
          {productItem.name ? `${productItem.name.slice(0, 20)}..` : ''}
        </Heading>
        <Text fontSize={12} pb={8}>
          {productItem.color}
        </Text>
        {productItem.stock > 0 ? (
          <Heading variant="heading.small">
            ₹{' '}
            {productItem.special_price === 0
              ? formatAmount(Number(productItem.unit_price))
              : formatAmount(Number(productItem.special_price))}
          </Heading>
        ) : (
          <Heading variant="heading.small">{productItem.deliveryTimeMessage}</Heading>
        )}
        {/* // <Heading variant="heading.small">
        //   ₹{' '}
        //   {productItem.special_price === 0
        //     ? formatAmount(Number(productItem.unit_price))
        //     : formatAmount(Number(productItem.special_price))}
        // </Heading> */}
        <Text fontSize={12} pb={8} pt={8}>
          {`Quantity : ${Number(qty)}`}
        </Text>
      </Box>
    </Box>
  </Flex>
);
ProductSummaryList.defaultProps = {
  productItem: {}
};
ProductSummaryList.propTypes = {
  productItem: PropTypes.object,
  qty: PropTypes.number.isRequired
};
export default ProductSummaryList;

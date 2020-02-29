import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const ProductSummaryList = ({ productItem, qty, sku }) => (
  <Flex pb={20}>
    <Box variant="col-4" pr={0} pl={0}>
      <Link to={formatProductURL(productItem.name, sku)}>
        <Image
          width={1}
          src={productItem.image || ''}
          alt=""
          sx={{
            boxShadow: 'productThumb'
          }}
        />
      </Link>
    </Box>
    <Box variant="col-8" pl={20}>
      <Box mb="10px">
        <Heading color="heading" fontSize={[14, 14, 14, 16]} lineHeight={1.4} pb={10}>
          {productItem.name ? `${productItem.name.slice(0, 20)}..` : ''}
        </Heading>
        <Text fontSize={14} pb={10}>
          {productItem.color}
        </Text>
        <Heading variant="heading.small">
          ₹{' '}
          {productItem.special_price === 0
            ? formatAmount(Number(productItem.unit_price) * Number(qty))
            : formatAmount(Number(productItem.special_price) * Number(qty))}
        </Heading>
      </Box>
    </Box>
  </Flex>
);
ProductSummaryList.defaultProps = {
  productItem: {}
};
ProductSummaryList.propTypes = {
  productItem: PropTypes.object,
  qty: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired
};
export default ProductSummaryList;

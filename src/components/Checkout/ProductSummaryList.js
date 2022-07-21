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
// import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';

const ProductSummaryList = ({ productItem, qty, itemInfo }) => (
  <Box>
    {qty ? (
      <Box variant="col-12">
        <Box sx={{ borderBottom: 'divider' }}>
          <Flex py={10}>
            <Box variant="col-4" pr={0} pl={0}>
              <Image
                width={1}
                src={`${productItem.image}?mode=fill` || ''} 
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
                  // <Heading variant="heading.small">
                  //   ₹{' '}
                  //   {productItem.special_price === 0
                  //     ? formatAmount(Number(productItem.unit_price))
                  //     : formatAmount(Number(productItem.special_price))}
                  // </Heading>

                  <Heading variant="heading.small">
                    ₹{' '}
                    {productItem.net_price > productItem.unit_price * qty
                      ? formatAmount(Number(productItem.unit_price) * qty)
                      : formatAmount(Number(productItem.net_price))}
                  </Heading>
                ) : (
                  <Heading variant="heading.small" color="rgb(173, 19, 19)">
                    Currently, product is out of stock
                  </Heading>
                )}
                {/* // <Heading variant="heading.small">
        //   ₹{' '}
        //   {productItem.special_price === 0
        //     ? formatAmount(Number(productItem.unit_price))
        //     : formatAmount(Number(productItem.special_price))}
        // </Heading> */}
                {/* <Text fontSize={12} pb={8} pt={8}>
                {`Quantity : ${Number(qty)}`}
              </Text> */}
                <Text fontSize={12} pb={8} pt={8}>
                  {`Quantity : ${Number(qty)}`}
                </Text>
              </Box>
            </Box>
          </Flex>
          {itemInfo && itemInfo.freebie_info && itemInfo.freebie_info.qty ? (
            <Box variant="col-8" ml="6.65%">
              <Flex py={10}>
                <Box variant="col-4" pr={0} pl={0}>
                  <Image
                    width={1}
                    src={itemInfo.freebie_info.image || ''}
                    alt=""
                    sx={{
                      boxShadow: 'productThumb'
                    }}
                  />
                </Box>
                <Box variant="col-8" pl={10} pr={0}>
                  <Box mb="10px">
                    <Heading color="heading" fontSize={[10, 10, 10, 12]} lineHeight={1.4} pb={2}>
                      {itemInfo.freebie_info.name ? `${itemInfo.freebie_info.name.slice(0, 10)}..` : ''}
                    </Heading>
                    <Heading variant="heading.small" fontSize={12}>
                      ₹ Free
                    </Heading>
                    <Text fontSize={12} pb={8} pt={8}>
                      {`Quantity : ${itemInfo.freebie_info.qty}`}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          ) : null}
        </Box>
      </Box>
    ) : null}
  </Box>
);
ProductSummaryList.defaultProps = {
  productItem: {}
};
ProductSummaryList.propTypes = {
  productItem: PropTypes.object,
  qty: PropTypes.number.isRequired,
  itemInfo: PropTypes.object.isRequired
};
export default ProductSummaryList;

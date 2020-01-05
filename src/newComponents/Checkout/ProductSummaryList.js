import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const ProductSummaryList = () => (
  <Flex pb={20}>
    <Box variant="col-4" pr={0}>
      <Link to="/">
        <Image
          width={1}
          src="https://www.hometown.in/media/product/59/2453/51165/1-top_sel_160.jpg"
          alt=""
          sx={{
            boxShadow: 'productThumb'
          }}
        />
      </Link>
    </Box>
    <Box variant="col-8" pl={20}>
      <Link to="/">
        <Box mb="10px">
          <Heading color="heading" fontSize={16} lineHeight={1.4} pb={10}>
            Product Name
          </Heading>
          <Text fontSize={14} pb={10}>
            Beige
          </Text>
          <Heading variant="heading.small">₹ 10,000</Heading>
        </Box>
      </Link>
    </Box>
  </Flex>
);

export default ProductSummaryList;

/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

import Slider from './Slider-copy';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate5({ data }) {
  const { headerTitle, collection } = data;
  return (
    <Box>
      <Box bg="#F5EEEE" py="20">
        <Heading textAlign="center" as="h2" pb="10" pt="20" fontSize="50px">
          {headerTitle}
        </Heading>
        <Flex justifyContent="center">
          <Box className={styles.horizontalSeperator} />
        </Flex>
        <Box>
          <Slider collection={collection}>
            <Flex className={styles.paymentOptions}>
              <Box width="140px" pb={20} ml="-100px">
                <Image src="https://static.hometown.in/media/cms/BankLOGO/hdfc.gif" alt="bank-option" />
              </Box>
              <Box>
                <Text as="h2" pb="10px" fontSize="16px">
                  0% Interest
                </Text>
                <Text as="span" fontSize="14px">
                  On upto 6 months EMI for orders above 3000
                </Text>
              </Box>
            </Flex>
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}
HtExclusiveTemplate5.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate5.defaultProps = {
  data: {
    mainTitle: '',
    subTitles: '',
    imageCollection: [],
    banner: ''
  }
};

export default HtExclusiveTemplate5;
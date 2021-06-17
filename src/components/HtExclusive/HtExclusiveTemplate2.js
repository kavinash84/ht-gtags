/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';

import Arrow from '../../../static/arrow_forward.svg';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate2({ data }) {
  const {
    mainTitle, subTitle, banner, imageCollection
  } = data;
  return (
    <Box>
      <Box bg="#F5F5F5" py="20">
        <Heading textAlign="center" as="h2" pb="10" className={styles.headerTitle} >
          {mainTitle}
        </Heading>
        <Flex justifyContent="center" alignItems="center">
          <Text textAlign="center" className={styles.subTitle}>{subTitle}</Text>
          <Image src={Arrow} />
        </Flex>
      </Box>
      <Box>
        <Image src={banner} alt="chester-furniture" height="800px" width="100%" />
      </Box>

      <Box>
        <Flex flexWrap="wrap" px="20" py="20" ml="70px">
          {imageCollection.map(arr => (
            <Col variant="col-4" py="20px">
              <Box>
                <Image src={arr.image} alt={arr.alt} className={styles.imageCollection} />
              </Box>
              <Box py="10px">
                <Text textAlign="center" fontWeight="bold" fontSize="25px" mr="70px">
                  {arr.title}
                </Text>
              </Box>
            </Col>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
HtExclusiveTemplate2.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate2.defaultProps = {
  data: {
    mainTitle: '',
    subTitles: '',
    imageCollection: [],
    banner: ''
  }
};

export default HtExclusiveTemplate2;

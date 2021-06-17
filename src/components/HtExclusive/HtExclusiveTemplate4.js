/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

import Slider from './Slider';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate4({ data }) {
  const {
    headerTitle, mainTitle, description, banner, collection
  } = data;
  return (
    <Box>
      <Box bg="#F5F5F5" py="20">
        <Heading textAlign="center" as="h2" pb="10">
          {headerTitle}
        </Heading>
        <Flex justifyContent="center">
          <Box className={styles.horizontalSeperator} />
        </Flex>
      </Box>
      <Box>
        <Image src={banner} alt="chester-furniture" />
      </Box>

      <Box>
        <Heading as="h2" pt="20px" textAlign="center">
          {mainTitle}
        </Heading>
        <Text className={styles.descriptionText}>{description}</Text>
      </Box>
      <Box>
        <Slider collection={collection} />
      </Box>
    </Box>
  );
}
HtExclusiveTemplate4.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate4.defaultProps = {
  data: {
    mainTitle: '',
    subTitles: '',
    imageCollection: [],
    banner: ''
  }
};

export default HtExclusiveTemplate4;

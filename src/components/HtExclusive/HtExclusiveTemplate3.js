/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Slider from './Slider';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate3({ data }) {
  const {
    mainTitle, description, banner, collection
  } = data;
  return (
    <Box>
      <Box>
        <Image className={styles.avatar} src={banner} alt="chester-furniture" />
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
HtExclusiveTemplate3.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate3.defaultProps = {
  data: {
    mainTitle: '',
    description: '',
    collection: [],
    banner: ''
  }
};

export default HtExclusiveTemplate3;

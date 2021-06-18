/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Slider from './Slider';

import Arrow from '../../../static/arrow_forward.svg';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate3({ data }) {
  const {
    mainTitle, description, banner, collection
  } = data;
  return (

    <Box className={styles.main}>
      <Section className={styles.left}>
        <Box>
          <Image className={styles.avatar} src={banner} alt="chester-furniture" />
        </Box>
      </Section>
      <Section className={styles.right}>
        <Box>
          <Heading as="h2" pt="20px" fontSize="40px" >
            {mainTitle}
          </Heading>
          <Text className={styles.description}>{description}</Text>
        </Box>

        <Box>
          <Slider collection={collection} />
        </Box>
        <Box className={styles.shopButton}>
          <Heading>SHOPPING LEATHER RECLINERS</Heading>
          <Image src={Arrow} />
        </Box>    
      </Section>
      
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

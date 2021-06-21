/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
// import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';

import Arrow from '../../../static/arrow_forward.svg';

const styles = require('./HtzExclusive.scss');

function HtExclusiveTemplate2({ data }) {
  const {
 mainTitle, subTitle, banner, imageCollection, link
} = data;
  console.log('data', data);
  return (
    <Box>
      <Box bg="#F5F5F5" py="20">
        <h2 className={styles.headerTitle}>{mainTitle}</h2>
        <Link to={link}>
          <Flex justifyContent="center" alignItems="center">
            <div className={styles.subTitle}>{subTitle}</div>
            <Image src={Arrow} />
          </Flex>
        </Link>
      </Box>
      <Box>
        <Image src={banner} alt="chester-furniture" height="800px" width="100%" />
      </Box>

      <Box>
        <Flex flexWrap="wrap" px="20" py="20">
          {imageCollection.map(arr => (
            <Col variant="col-4" py="20px">
              <Link to={arr.link} cursor="pointer">
                <Flex justifyContent="center" alignItems="center">
                  <Image src={arr.image} alt={arr.alt} className={styles.imageCollection} />
                </Flex>
                <Box py="10px">
                  <Text textAlign="center" fontWeight="bold" fontSize="25px">
                    {arr.title}
                  </Text>
                </Box>
              </Link>
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
    banner: '',
    link: ''
  }
};

export default HtExclusiveTemplate2;

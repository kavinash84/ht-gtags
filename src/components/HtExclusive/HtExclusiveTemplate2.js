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

import CategoryBannerImage from './CategoryBannerImage';
import HtExclusiveContainer from './HtExclusiveContainer';
import CategoryHeader from './Header';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate2({ data }) {
  const {
 mainTitle, subTitle, banner, imageCollection, link
} = data;
  return (
    <Box>
      <CategoryHeader mainTitle={mainTitle} subTitle={subTitle} link={link} />

      <CategoryBannerImage banner={banner} />

      <HtExclusiveContainer>
        <Flex flexWrap="wrap" px="20px" pb="40px" pt="20px">
          {imageCollection.map(arr => (
            <Col variant="col-4" py="20px">
              <Link to={arr.link} cursor="pointer">
                <Flex justifyContent="center" alignItems="center">
                  <Image src={arr.image} alt={arr.alt} className={styles.imageCollection} />
                </Flex>
                <Box py="10px">
                  <Text textAlign="center" fontWeight="bold" fontSize="33px">
                    {arr.title}
                  </Text>
                </Box>
              </Link>
            </Col>
          ))}
        </Flex>
      </HtExclusiveContainer>
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

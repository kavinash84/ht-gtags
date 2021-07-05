import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import SlickSlider from '../SlickSlider';
import Arrow from '../../../static/htexclusive/forward-arrow.svg';

import CategoryBannerImage from './CategoryBannerImage';
import HtExclusiveContainer from './HtExclusiveContainer';
import CategoryHeader from './Header';

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate4({ data }) {
  const {
 headerTitle, mainTitle, description, banner, collection
} = data;
  return (
    <Box mb="60px">
      <CategoryHeader mainTitle={headerTitle} horizontalSeperator />

      <CategoryBannerImage banner={banner} />

      <HtExclusiveContainer>
        <Heading as="h2" pt="20px" textAlign="center" fontSize="40px">
          {mainTitle}
        </Heading>

        <div className={styles.descriptionText}>{description}</div>

        <SlickSlider settings={adjustSlides(12)}>
          {collection.length &&
            collection.map((slide, index) => (
              <Box key={String(index)}>
                <Flex className={styles.Options}>
                  <Image
                    sx={{
                      height: '400px',
                      width: '400px',
                      objectFit: 'cover'
                    }}
                    src={slide.url}
                    alt="bank-option"
                  />
                  <Box mt="20px">
                    <Link to={slide.link}>
                      <Flex justifyContent="flex-start" alignItems="center">
                        <Box pr="5px">
                          <Text as="h2" py="10px" fontSize="25px" textAlign="left">
                            {slide.name}
                          </Text>
                        </Box>
                        <Box>
                          <Image ml="5px" textAlign="left" src={Arrow} height="20px" width="20px" />
                        </Box>
                      </Flex>
                    </Link>
                  </Box>
                </Flex>
              </Box>
            ))}
        </SlickSlider>
      </HtExclusiveContainer>
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

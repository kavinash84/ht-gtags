/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import SlickSlider from '../SlickSlider';

// import Slider from './Slider-copy';

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 3.3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate5({ data }) {
  const { headerTitle, collection } = data;
  return (
    <Box mb="-50px">
      <Box bg="#F5EEEE" py="20">
        <Heading textAlign="center" as="h2" pb="10" pt="20" fontSize="40px">
          {headerTitle}
        </Heading>
        <Flex justifyContent="center">
          <Box className={styles.horizontalSeperator} />
        </Flex>
        <Box>
          <Box width="1000px" margin="20px auto">
            <SlickSlider settings={adjustSlides(12)}>
              {collection.length &&
                collection.map((slide, index) => (
                  <Box key={String(index)} p="10px">
                    <Flex className={styles.paymentOptions}>
                      <Box width="140px" pb={20} ml="-85px">
                        <Image src={slide.url} alt="bank-option" />
                      </Box>
                      <Box>
                        <Text as="h2" fontSize="16px">
                          {slide.title}
                        </Text>
                        <Text as="span" fontSize="14px">
                          {slide.desc}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                ))}
            </SlickSlider>
          </Box>
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

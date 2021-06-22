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

// import Slider from './Slider';
// import Slider from './Slider-copy';

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
      {headerTitle && (
        <Box bg="#F5F5F5" py="20">
          <Heading textAlign="center" as="h2" pb="10" pt="20" fontSize="50px">
            {headerTitle}
          </Heading>
          <Flex justifyContent="center">
            <Box className={styles.horizontalSeperator} />
          </Flex>
        </Box>
      )}
      <Box>
        <Image src={banner} alt="chester-furniture" width="100%" Height="800px" />
      </Box>

      <Box width="1000px" margin="0 auto">
        <Heading as="h2" pt="20px" textAlign="center" fontSize="40px">
          {mainTitle}
        </Heading>
        <div className={styles.descriptionText}>{description}</div>
      </Box>

      <Box width="1000px" margin="0 auto">
        <SlickSlider settings={adjustSlides(12)}>
          {collection.length &&
            collection.map((slide, index) => (
              <Box key={String(index)}>
                <Flex className={styles.Options}>
                  <Box width="300px">
                    <Image src={slide.url} alt="bank-option" height="350px" width="400px" />
                  </Box>
                  <Box mt="20px">
                    <Link to={slide.link}>
                      <Flex justifyContent="flex-start" alignItems="center">
                        <Box pr="5px">
                          <Text as="h2" py="10px" fontSize="25px" textAlign="left">
                            {slide.name}
                          </Text>
                        </Box>
                        <Box>
                          <Image textAlign="left" src={Arrow} height="20px" width="20px" />
                        </Box>
                      </Flex>
                    </Link>
                  </Box>
                </Flex>
              </Box>
            ))}
        </SlickSlider>
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

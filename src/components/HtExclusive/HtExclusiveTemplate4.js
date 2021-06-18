import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
// import Arrow from '../../../static/arrow_forward.svg';


// import Slider from './Slider';
import Slider from './Slider-copy';


const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate4({ data }) {
  const {
    headerTitle, mainTitle, description, banner, collection
  } = data;
  return (
    <Box>
      <Box bg="#F5F5F5" py="20">
        <Heading textAlign="center" as="h2" pb="10" pt="20" fontSize="50px">
          {headerTitle}
        </Heading>
        <Flex justifyContent="center">
          <Box className={styles.horizontalSeperator} />
        </Flex>
      </Box>
      <Box>
        <Image src={banner} alt="chester-furniture" width="100%" Height="800px" />
      </Box>

      <Box>
        <Heading as="h2" pt="20px" textAlign="center" fontSize="40px">
          {mainTitle}
        </Heading>
        <Text className={styles.descriptionText}>{description}</Text>
      </Box>
      <Box>
        <Slider collection={collection} >  
          <Flex className={styles.Options}>
            <Box width="350px" >
              <Image src="https://www.hometown.in/media/cms/hometownnew/ht-exclusive/template4/traditional/shop-living.png" alt="bank-option" height="350px" width="400px" />
            </Box>
            <Box>
              <Flex >
                <Text as="h2" py="10px" fontSize="25px" textAlign="left">
                  SHOP LIVING
                </Text>
                {/* <Image src={Arrow} height="20px" width="20px" /> */}
              </Flex>
            </Box>
          </Flex>
        </Slider>
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

/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import SlickSlider from '../SlickSlider';

import HtExclusiveContainer from './HtExclusiveContainer';

import Arrow from '../../../static/htexclusive/forward-arrow.svg';

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 3.3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate3({ data }) {
  const {
    mainTitle,
    description,
    banner,
    collection
    //  link, shop
  } = data;
  return (
    <HtExclusiveContainer className={styles.main}>
      <Flex py="50px">
        <Col variant="col-5" justifyContent="center" alignItems="center">
          <Image className={styles.avatar} src={banner} alt="chester-furniture" />
        </Col>
        <Col variant="col-7">
          <Box>
            <Heading as="h2" fontSize="35px" ml="5px">
              {mainTitle}
            </Heading>
            <Text sx={{ margin: '20px 0 20px 5px', fontSize: '26px' }} className={styles.description}>
              {description}
            </Text>
          </Box>

          <Box>
            <SlickSlider settings={adjustSlides(12)}>
              {collection.length &&
                collection.map((slide, index) => (
                  <Box key={String(index)} p="10px">
                    <Link to={slide.link}>
                      <Image height="60%" src={slide.url} alt={`ht-exclusive-carousel-${index}`} pb="10px" />
                      <Text textAlign="center">{slide.name}</Text>
                    </Link>
                  </Box>
                ))}
            </SlickSlider>
          </Box>

          {/* <Link to={link}>
            <div className={styles.shopButton}>
              <Heading fontSize="30px" mr="5px">
                {shop}
              </Heading>
              <Image ml="5px" textAlign="left" src={Arrow} height="30px" width="20px" />
            </div>
          </Link> */}
        </Col>
      </Flex>
    </HtExclusiveContainer>
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
    banner: '',
    link: '',
    shop: ''
  }
};

export default HtExclusiveTemplate3;

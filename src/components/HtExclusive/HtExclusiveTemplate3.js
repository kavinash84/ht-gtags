/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import SlickSlider from '../SlickSlider';
// import Slider from './Slider';

import Arrow from '../../../static/arrow_forward.svg';

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 3.3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate3({ data }) {
  const {
 mainTitle, description, banner, collection, link
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
          <Heading as="h2" fontSize="35px" ml="5px">
            {mainTitle}
          </Heading>
          <Text m="20px 0 20px 5px" className={styles.description}>
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

        <Link to={link}>
          <Box className={styles.shopButton}>
            <Heading mr="5px">SHOPPING LEATHER RECLINERS</Heading>
            <Image src={Arrow} />
          </Box>
        </Link>
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
    banner: '',
    link: ''
  }
};

export default HtExclusiveTemplate3;

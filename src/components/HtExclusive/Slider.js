import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 2 ? 3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

function Slider({ collection }) {
  return (
    <Box>
      <Box p="15px">
        <SlickSlider settings={adjustSlides(12)}>
          {collection.length &&
            collection.map((slide, index) => (
              <Box key={String(index)}>
                <Link to={slide.link}>
                  <Image src={slide.url} alt={`ht-exclusive-carousel-${index}`} />
                  <Text textAlign="center">{slide.name}</Text>
                </Link>
              </Box>
            ))}
        </SlickSlider>
      </Box>
    </Box>
  );
}

Slider.propTypes = {
  collection: PropTypes.array
};

Slider.defaultProps = {
  collection: []
};

export default Slider;

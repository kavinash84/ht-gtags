import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';

import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

function Slider({ collection, children }) {
  return (
    <Box>
      <Box p="15px">
        <SlickSlider settings={adjustSlides(12)}>
          {collection.length &&
            collection.map((slide, index) => (
              <Box key={String(index)}>
                {/* <Link to={slide.link}>
                  <Image src={slide.url} alt={`ht-exclusive-carousel-${index}`} />
                  <Text textAlign="center">{slide.name}</Text>
                </Link> */}
                {children}
              </Box>
            ))}
        </SlickSlider>
      </Box>
    </Box>
  );
}

Slider.propTypes = {
  collection: PropTypes.array,
  children: PropTypes.object.isRequired
};

Slider.defaultProps = {
  collection: []
};

export default Slider;

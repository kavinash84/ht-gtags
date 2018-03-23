import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import CarouselItem from '../Carousel/CarouselItem.js';

const MainSliderItem = require('../../data/MainSliderItem.js');

const CarouselMain = ({
  autoPlayVal,
  showThumbsVal,
  showStatusVal,
  showIndicatorsVal,
  infiniteLoopVal,
  centerModeVal,
  centerSlidePercentageVal
}) => (
  <Carousel
    autoPlay={autoPlayVal}
    showIndicators={showIndicatorsVal}
    showThumbs={showThumbsVal}
    showStatus={showStatusVal}
    infiniteLoop={infiniteLoopVal}
    centerMode={centerModeVal}
    centerSlidePercentage={centerSlidePercentageVal}
  >
    {MainSliderItem.map(slide => (
      <CarouselItem key={slide.id} itemIndex={slide.id} title={slide.title} img={slide.img} />
    ))}
  </Carousel>
);

CarouselMain.propTypes = {
  autoPlayVal: PropTypes.bool.isRequired,
  showThumbsVal: PropTypes.bool.isRequired,
  showStatusVal: PropTypes.bool.isRequired,
  showIndicatorsVal: PropTypes.bool.isRequired,
  centerModeVal: PropTypes.bool.isRequired,
  infiniteLoopVal: PropTypes.bool.isRequired,
  centerSlidePercentageVal: PropTypes.string.isRequired
};

export default CarouselMain;

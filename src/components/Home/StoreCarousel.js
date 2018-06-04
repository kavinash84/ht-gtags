import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import StoreCarouselItem from './StoreCarouselItem.js';

const StoreCarousel = ({
  autoPlayVal,
  className,
  showThumbsVal,
  showStatusVal,
  showIndicatorsVal,
  infiniteLoopVal,
  centerModeVal,
  showArrowsVal,
  centerSlidePercentageVal,
  data
}) => (
  <Carousel
    autoPlay={autoPlayVal}
    showIndicators={showIndicatorsVal}
    showThumbs={showThumbsVal}
    showStatus={showStatusVal}
    infiniteLoop={infiniteLoopVal}
    centerMode={centerModeVal}
    centerSlidePercentage={centerSlidePercentageVal}
    thumbWidth={20}
    className={className}
    showArrows={showArrowsVal}
    selectedItem={3}
  >
    {data.map((store, index) => <StoreCarouselItem key={String(index)} name={store.city} />)}
  </Carousel>
);

StoreCarousel.defaultProps = {
  showArrowsVal: false,
  className: 'storeSlider'
};

StoreCarousel.propTypes = {
  autoPlayVal: PropTypes.bool.isRequired,
  showThumbsVal: PropTypes.bool.isRequired,
  showStatusVal: PropTypes.bool.isRequired,
  showIndicatorsVal: PropTypes.bool.isRequired,
  centerModeVal: PropTypes.bool.isRequired,
  infiniteLoopVal: PropTypes.bool.isRequired,
  centerSlidePercentageVal: PropTypes.number.isRequired,
  className: PropTypes.string,
  showArrowsVal: PropTypes.bool,
  data: PropTypes.array.isRequired
};

export default StoreCarousel;

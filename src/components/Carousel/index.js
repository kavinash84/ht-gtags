import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import CarouselItem from '../Carousel/CarouselItem.js';

const CarouselMain = ({
  autoPlayVal,
  showThumbsVal,
  showStatusVal,
  showIndicatorsVal,
  infiniteLoopVal,
  centerModeVal,
  showArrowsVal,
  centerSlidePercentageVal,
  className,
  sliderImages,
  contentStatus,
  typeOfSlider
}) => (
  <Carousel
    autoPlay={autoPlayVal}
    showIndicators={showIndicatorsVal}
    showThumbs={showThumbsVal}
    showStatus={showStatusVal}
    infiniteLoop={infiniteLoopVal}
    centerMode={centerModeVal}
    centerSlidePercentage={centerSlidePercentageVal}
    className={className}
    showArrows={showArrowsVal}
  >
    {sliderImages.map(slide => (
      <CarouselItem
        key={slide.id}
        itemIndex={slide.id}
        itemData={slide}
        contentStatus={contentStatus}
        img={slide.img}
        typeOfSlider={typeOfSlider}
      />
    ))}
  </Carousel>
);

CarouselMain.defaultProps = {
  showArrowsVal: false
};

CarouselMain.propTypes = {
  autoPlayVal: PropTypes.bool.isRequired,
  showThumbsVal: PropTypes.bool.isRequired,
  showStatusVal: PropTypes.bool.isRequired,
  showIndicatorsVal: PropTypes.bool.isRequired,
  centerModeVal: PropTypes.bool.isRequired,
  infiniteLoopVal: PropTypes.bool.isRequired,
  centerSlidePercentageVal: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  showArrowsVal: PropTypes.bool,
  sliderImages: PropTypes.array.isRequired,
  contentStatus: PropTypes.bool.isRequired,
  typeOfSlider: PropTypes.string.isRequired
};

export default CarouselMain;

import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';

const ProductDetailsSlider = ({ imageList }) => (
  <section className="prodSlider">
    <Carousel
      autoPlayVal={false}
      className="catSlider"
      showThumbsVal={false}
      showStatusVal={false}
      showArrowsVal
      showIndicatorsVal={false}
      infiniteLoopVal={false}
      centerModeVal
      centerSlidePercentageVal={100}
      sliderImages={imageList}
      contentStatus={false}
      typeOfSlider="productSlider"
    />
  </section>
);

ProductDetailsSlider.propTypes = {
  imageList: PropTypes.array.isRequired
};

export default ProductDetailsSlider;

import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';

const SliderItem = require('../../data/RecentlyViewedProducts.js');

const ProductSlider = ({ productSliderTitle }) => (
  <section className="prodSlider">
    <div className="head">
      <div className="container">
        <div className="title">
          <h4>{productSliderTitle}</h4>
        </div>
      </div>
    </div>
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
      sliderImages={SliderItem}
      contentStatus
      typeOfSlider="productSlider"
    />
  </section>
);

ProductSlider.defaultProps = {
  productSliderTitle: ''
};

ProductSlider.propTypes = {
  productSliderTitle: PropTypes.string
};

export default ProductSlider;

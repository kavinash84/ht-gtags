import React from 'react';
import PropTypes from 'prop-types';
import Title from 'components/Title';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Carousel from '../Carousel';

const SliderItem = require('../../data/RecentlyViewedProducts.js');

const ProductSlider = ({ productSliderTitle }) => (
  <Section p="0" pt="2.5rem" mb="0">
    <Container pr="0" pl="0">
      <Title title={productSliderTitle} />
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
    </Container>
  </Section>
);

ProductSlider.defaultProps = {
  productSliderTitle: ''
};

ProductSlider.propTypes = {
  productSliderTitle: PropTypes.string
};

export default ProductSlider;

import React from 'react';
import PropTypes from 'prop-types';
import Title from 'components/Title';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Carousel from '../Carousel';

const SliderItem = require('../../data/RecentlyViewedProducts.js');

const ProductSlider = ({ productSliderTitle, colSize }) => (
  <Section p="0" pt="2.5rem" mb="0">
    <Container pr="0" pl="0">
      <Title title={productSliderTitle} />
      <Carousel
        autoPlayVal={false}
        className="prodSlider"
        showThumbsVal={false}
        showStatusVal={false}
        showArrowsVal
        showIndicatorsVal={false}
        infiniteLoopVal={false}
        centerModeVal
        centerSlidePercentageVal={colSize}
        sliderImages={SliderItem}
        contentStatus
        typeOfSlider="productSlider"
      />
    </Container>
  </Section>
);

ProductSlider.defaultProps = {
  productSliderTitle: '',
  colSize: '100%'
};

ProductSlider.propTypes = {
  productSliderTitle: PropTypes.string,
  colSize: PropTypes.string
};

export default ProductSlider;

import React, { Component } from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.css';
import Carousel from '../Carousel';

const SliderItem = require('../../data/MainSliderItem.js');

export default class HomeSlider extends Component {
  render() {
    // const styles = require('./HomeSlider.scss');

    return (
      <div>
        <Carousel
          autoPlayVal
          showThumbsVal={false}
          showStatusVal={false}
          showIndicatorsVal
          infiniteLoopVal
          centerModeVal={false}
          centerSlidePercentageVal={100}
          sliderImages={SliderItem}
        />
      </div>
    );
  }
}

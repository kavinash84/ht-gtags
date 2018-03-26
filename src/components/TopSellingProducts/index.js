import React, { Component } from 'react';
import Carousel from '../Carousel';

const SliderItem = require('../../data/TopSellingProducts.js');

export default class TopSellingProducts extends Component {
  render() {
    return (
      <div className="prodSlider">
        <div className="head">
          <div className="container">
            <div className="title">
              <h4>Top Selling Products</h4>
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
      </div>
    );
  }
}

import React, { Component } from 'react';
import Carousel from '../Carousel';

const SliderItem = require('../../data/RecentlyViewedProducts.js');

export default class RecentlyViewedProducts extends Component {
  render() {
    return (
      <section className="prodSlider">
        <div className="head">
          <div className="container">
            <div className="title">
              <h4>Recently Viewed Products</h4>
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
  }
}
import React, { Component } from 'react';
import Carousel from '../Carousel';

const SliderItem = require('../../data/ShopByRoom.js');

export default class ShopByRoom extends Component {
  render() {
    return (
      <section>
        <div className="head">
          <div className="container">
            <div className="title">
              <h4>Shop by Room</h4>
            </div>
          </div>
        </div>
        <Carousel
          autoPlayVal={false}
          className="catSlider"
          showThumbsVal={false}
          showStatusVal={false}
          showArrowsVal={false}
          showIndicatorsVal={false}
          infiniteLoopVal={false}
          centerModeVal
          centerSlidePercentageVal={42}
          sliderImages={SliderItem}
          contentStatus
          typeOfSlider="catSlider"
        />
      </section>
    );
  }
}

import React, { Component } from 'react';
import Carousel from '../Carousel';

const SliderItem = require('../../data/ShopByRoom.js');

export default class ShopByRoom extends Component {
  render() {
    return (
      <div>
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
          titleStatus
        />
      </div>
    );
  }
}

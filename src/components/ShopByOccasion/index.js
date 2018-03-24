import React, { Component } from 'react';
import Carousel from '../Carousel';

const SliderItem = require('../../data/ShopByOccasion.js');

export default class ShopByOccasion extends Component {
  render() {
    const styles = require('./ShopByOccasion.scss');

    return (
      <div>
        <div className="head">
          <div className="container">
            <div className="title">
              <h4>Shop by Occasion</h4>
            </div>
          </div>
        </div>
        <Carousel
          autoPlayVal={false}
          className={styles.catSlider}
          showThumbsVal={false}
          showStatusVal={false}
          showArrowsVal={false}
          showIndicatorsVal={false}
          infiniteLoopVal={false}
          centerModeVal
          centerSlidePercentageVal={42}
          sliderImages={SliderItem}
        />
      </div>
    );
  }
}

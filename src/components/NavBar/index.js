import React, { Component } from 'react';
import Carousel from '../Carousel';

const menuItems = require('../../data/Menu.js');

export default class NavBar extends Component {
  render() {
    const styles = require('./NavBar.scss');

    return (
      <div className={styles.navBar}>
        <div className={styles.homeIcon}>
          <a href="#home">
            <img src="http://via.placeholder.com/20x20" alt="" />
          </a>
        </div>
        <div className={styles.navBarSlider}>
          <Carousel
            autoPlayVal={false}
            className="menuSlider"
            showThumbsVal={false}
            showStatusVal={false}
            showArrowsVal={false}
            showIndicatorsVal={false}
            infiniteLoopVal={false}
            centerModeVal
            centerSlidePercentageVal={42}
            sliderImages={menuItems}
            contentStatus
            typeOfSlider="menuSlider"
          />
        </div>
      </div>
    );
  }
}

import React from 'react';
import Carousel from '../Carousel';

const styles = require('./NavBar.scss');
const menuItems = require('../../data/Menu.js');
const HomeIcon = require('../../../static/home.jpg');

const NavBar = () => (
  <div className={styles.navBar}>
    <div className={styles.homeIcon}>
      <a href="#home">
        <img src={HomeIcon} alt="" />
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

export default NavBar;

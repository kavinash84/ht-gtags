import React from 'react';
// import Carousel from '../Carousel';

const styles = require('./NavBar.scss');
const menuItems = require('../../data/Menu.js');

const NavBar = () => (
  <div className={styles.navBar}>
    <div className={styles.navBarSlider}>
      {menuItems.map(menuItem => (
        <a href="#home" key={menuItem.id}>
          {menuItem.name}
        </a>
      ))}
    </div>
  </div>
);

export default NavBar;

import React, { Component } from 'react';
import Hamburger from 'components/Hamburger';
import SideBar from 'components/SideBar';

// const MenuItem = require('../../data/Menu.js');

export default class Menu extends Component {
  render() {
    const styles = require('./Menu.scss');

    return (
      <div className={styles.menuContainer}>
        <Hamburger />
        <SideBar />
      </div>
    );
  }
}

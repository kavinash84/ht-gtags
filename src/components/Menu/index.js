import React, { Component } from 'react';
import NavBar from 'components/NavBar';
import MenuSidebar from './MenuSidebar';

// const MenuItem = require('../../data/Menu.js');

export default class Menu extends Component {
  render() {
    const styles = require('./Menu.scss');

    return (
      <div className={styles.menuContainer}>
        <div className="container">
          <MenuSidebar />
          <NavBar />
        </div>
      </div>
    );
  }
}

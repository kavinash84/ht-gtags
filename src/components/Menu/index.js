import React from 'react';
import NavBar from 'components/NavBar';
import MenuSidebar from './MenuSidebar';

const styles = require('./Menu.scss');

const Menu = () => (
  <div className={styles.menuContainer}>
    <div className="container">
      <MenuSidebar />
      <NavBar />
    </div>
  </div>
);

export default Menu;

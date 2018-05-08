import React from 'react';
import NavBar from 'components/NavBar';
// import Search from 'components/Search';
import MenuSidebar from './MenuSidebar';

const styles = require('./Menu.scss');

const Menu = () => (
  <div className={styles.menuContainer}>
    <div className="container">
      <MenuSidebar />
      {/* }<Search /> */}
      <NavBar />
    </div>
  </div>
);

export default Menu;

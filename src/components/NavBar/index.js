import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = require('./NavBar.scss');

const NavBar = ({ menuItems, handleEnter }) => (
  <div className={styles.navBar}>
    <div className={styles.navBarSlider}>
      {menuItems.map(menuItem => (
        <Link to={menuItem.url_key} key={menuItem.id} onMouseEnter={handleEnter(menuItem.id)}>
          {menuItem.name}
        </Link>
      ))}
    </div>
  </div>
);

NavBar.defaultProps = {
  menuItems: []
};

NavBar.propTypes = {
  menuItems: PropTypes.array,
  handleEnter: PropTypes.func.isRequired
};

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = require('./NavBar.scss');

const NavBar = ({
  menuItems, handleEnter, handleLeave, exitOnClick
}) => (
  <div className={styles.navBar} onMouseLeave={handleLeave}>
    <div className={styles.navBarSlider}>
      {menuItems.filter(menu => menu.visibility === 'on').map(menuItem => (
        <Link
          onClick={exitOnClick}
          to={`/${menuItem.url_key}`}
          key={menuItem.id}
          onMouseEnter={handleEnter(menuItem.id)}
        >
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
  handleEnter: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
  exitOnClick: PropTypes.func.isRequired
};

export default NavBar;

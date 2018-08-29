import React from 'react';
import Container from 'hometown-components/lib/Container';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = require('./NavBar.scss');

const NavBar = ({
  menuItems, handleEnter, handleLeave, exitOnClick
}) => (
  <div className={styles.navBar} onMouseLeave={handleLeave}>
    <Container pr="0" pl="0">
      <div className={styles.navBarSlider}>
        {menuItems.filter(menu => menu.visibility === 'on').map(menuItem => (
          <Link
            onClick={exitOnClick}
            to={`/category/${menuItem.url_key}`}
            key={menuItem.id}
            onMouseEnter={handleEnter(menuItem.id)}
          >
            {menuItem.name}
          </Link>
        ))}
      </div>
    </Container>
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

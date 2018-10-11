import React from 'react';
import Container from 'hometown-components/lib/Container';
import { Link } from 'react-router-dom';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';
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
            to={`/${menuItem.url_key}`}
            key={menuItem.id}
            onMouseEnter={handleEnter(menuItem.id)}
          >
            {menuItem.name}
          </Link>
        ))}
        <Link onClick={exitOnClick} to="/modular-kitchens" onMouseEnter={handleEnter('')}>
          Modular Kitchens
        </Link>
        <Link onClick={exitOnClick} to="/design-build" onMouseEnter={handleEnter('')}>
          Design & Build
        </Link>
        <div className={`${styles.moreDropdownWrapper} dropdownWrapper`}>
          <Button
            btnType="custom"
            bg="transparent"
            color="#FFF"
            border="none"
            fontSize="0.875rem !important"
            tt="uppercase"
            p="10px 15px 10px 0px"
            lh="1.8"
            height="46px"
            className="moreDropdown"
          >
            More
          </Button>
          <div className="dropDown blockRight">
            <ul>
              <li>
                <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                  <Link onClick={exitOnClick} to="/clearance-sale" onMouseEnter={handleEnter('')}>
                    Clearance Sale
                  </Link>
                </Label>
              </li>
              <li>
                <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                  <Link onClick={exitOnClick} to="/bulk-order" onMouseEnter={handleEnter('')}>
                    Bulk Order
                  </Link>
                </Label>
              </li>
            </ul>
          </div>
        </div>
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

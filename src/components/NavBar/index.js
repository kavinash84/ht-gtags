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
        {menuItems.filter(menu => menu.visibility === 'on' && menu.name !== 'Festive Gifts').map(menuItem => (
          <Link
            onClick={exitOnClick}
            title={menuItem.name}
            to={`/${menuItem.url_key}`}
            key={menuItem.id}
            onMouseEnter={handleEnter(menuItem.id)}
          >
            {menuItem.name}
          </Link>
        ))}
        <a
          href="https://www.hometown.in/modular-kitchens"
          title="Design & Build"
          target="_blank"
          rel="noopener noreferrer"
          onClick={exitOnClick}
        >
          Modular Kitchens
        </a>
        <div className={`${styles.moreDropdownWrapper} dropdownWrapper`}>
          <Button
            btnType="custom"
            bg="transparent"
            color="#FFF"
            border="none"
            fontSize="0.875rem !important"
            tt="uppercase"
            p="10px 15px 10px 0px"
            lh="2"
            height="46px"
            className="moreDropdown"
            fontFamily="light"
          >
            More
          </Button>
          <div className="dropDown blockRight">
            <ul>
              <li>
                <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                  <a
                    href="https://www.hometown.in/design-build"
                    title="Design & Build"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={exitOnClick}
                  >
                    Design & Build
                  </a>
                </Label>
              </li>
              <li>
                <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                  <Link onClick={exitOnClick} to="/gifts" onMouseEnter={handleEnter('')} title="Festive Gifts">
                    Festive Gifts
                  </Link>
                </Label>
              </li>
              <li>
                <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                  <Link onClick={exitOnClick} to="/bulk-order" onMouseEnter={handleEnter('')} title="Bulk Order">
                    Bulk Order
                  </Link>
                </Label>
              </li>
              <li>
                <Label htmlFor="checkbox" fontSize="0.75em" ml="0.625rem" className="dropdownValue">
                  <a
                    href="https://static.hometown.in/media/Institutional+Catalogue.pdf"
                    title="Festive Catalogue"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Festive Catalogue
                  </a>
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

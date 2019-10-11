import React, { Fragment, Component } from 'react';
import Container from 'hometown-components/lib/Container';
import { Link } from 'react-router-dom';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';
import PropTypes from 'prop-types';

const styles = require('./NavBar.scss');

// const { SITE_URL } = process.env;

class NavBar extends Component {
  render() {
    const {
      menuItems, handleEnter, handleLeave, exitOnClick
    } = this.props;
    const cats = menuItems
      .filter(menu => menu.visibility === 'on' && menu.sort_order && !Number.isNaN(parseInt(menu.sort_order, 10)))
      .sort((i1, i2) => {
        const a = parseInt(i1.sort_order, 10);
        const b = parseInt(i2.sort_order, 10);
        return a - b;
      });
    const main = cats.length ? cats.slice(0, 7) : [];
    const more = cats.length && cats.length > 7 ? cats.slice(7) : [];
    return (
      <div className={styles.navBar} onMouseLeave={handleLeave}>
        <Container pr="0" pl="0">
          <div className={styles.navBarSlider}>
            {main.map((menuItem, i) => (
              <Link
                onClick={exitOnClick}
                title={menuItem.name}
                to={`/${menuItem.url_key}`}
                key={`${menuItem.id}_${String(i)}`}
                onMouseEnter={handleEnter(menuItem.id)}
              >
                {menuItem.name === 'Hot Deals' ? (
                  <Fragment>
                    <Label className={styles.newLabel}>New</Label>
                    {menuItem.name}
                  </Fragment>
                ) : (
                  menuItem.name
                )}
              </Link>
            ))}
            <Link
              to="/modular-kitchens"
              title="Modular Kitchens"
              target="_blank"
              rel="noopener noreferrer"
              onClick={exitOnClick}
            >
              Modular Kitchens
            </Link>
            <div className={`${styles.moreDropdownWrapper} dropdownWrapper moreDropdownWrapper`}>
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
                  {more.map((menuItem, i) => (
                    <li key={`${menuItem.id}_${String(i)}`}>
                      <Label htmlFor="checkbox" fontSize="0.75em" className="dropdownValue">
                        <Link
                          onClick={exitOnClick}
                          onMouseEnter={handleEnter('')}
                          title={menuItem.name}
                          to={`/${menuItem.url_key}`}
                        >
                          {menuItem.name || 'Hometown'}
                        </Link>
                      </Label>
                    </li>
                  ))}
                  <li>
                    <Label htmlFor="checkbox" fontSize="0.75em" className="dropdownValue">
                      <Link onClick={exitOnClick} to="/bulk-order" onMouseEnter={handleEnter('')} title="Bulk Order">
                        Bulk Order
                      </Link>
                    </Label>
                  </li>
                  <li>
                    <Label htmlFor="checkbox" fontSize="0.75em" className="dropdownValue">
                      <Link
                        to="/design-build"
                        title="Design & Build"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={exitOnClick}
                      >
                        Design & Build
                      </Link>
                    </Label>
                  </li>
                  <li>
                    <Label htmlFor="checkbox" fontSize="0.75em" className="dropdownValue">
                      <a
                        href="https://static.hometown.in/media/Institutional+Catalogue.pdf"
                        title="Festive Catalogue"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Gifting Catalogue
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
  }
}

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

import React, { Fragment, Component } from 'react';
import Container from 'hometown-components/lib/Container';
import { Link } from 'react-router-dom';

import ButtonHtV1 from 'hometown-components/lib/ButtonHtV1';
import LabelHtV1 from 'hometown-components/lib/Label';
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
                    <LabelHtV1>New</LabelHtV1>
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
            <div mt={-2}>
              <ButtonHtV1 padding="10px 15px 10px 0px" variant="buttons.outline">
                More
              </ButtonHtV1>
              <div>
                <ul>
                  {more &&
                    more.map((menuItem, i) => (
                      <li key={`${menuItem.id}_${String(i)}`}>
                        <Link
                          onClick={exitOnClick}
                          onMouseEnter={handleEnter('')}
                          title={menuItem.name}
                          to={`/${menuItem.url_key}`}
                        >
                          {menuItem.name || 'Hometown'}
                        </Link>
                      </li>
                    ))}
                  <li>
                    <Link onClick={exitOnClick} to="/bulk-order" onMouseEnter={handleEnter('')} title="Bulk Order">
                      Bulk Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/design-build"
                      title="Design & Build"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={exitOnClick}
                    >
                      Design & Build
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://hometown.in/media/Institutional+Catalogue.pdf"
                      title="Festive Gifts Catalogue"
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gifting Catalogue
                    </a>
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

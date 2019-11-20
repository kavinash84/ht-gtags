import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* ====== Components ====== */
import AbsoluteHtV1 from 'hometown-components/lib/AbsoluteHtV1';
import ButtonHtV1 from 'hometown-components/lib/ButtonHtV1';
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import ContainerHtV1 from 'hometown-components/lib/ContainerHtV1';
import LabelHtV1 from 'hometown-components/lib/LabelHtV1';
import LiHtV1 from 'hometown-components/lib/LiHtV1';
import LinkRedirectHtV1 from 'hometown-components/lib/LinkRedirectHtV1';
import RowHtV1 from 'hometown-components/lib/RowHtV1';
import TextHtV1 from 'hometown-components/lib/TextHtV1';
import UlHtV1 from 'hometown-components/lib/UlHtV1';

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
      <BoxHtV1 onMouseLeave={handleLeave}>
        <ContainerHtV1 pr="0" pl="0">
          <RowHtV1 variant="row.nav">
            {main.map((menuItem, i) => (
              <TextHtV1
                as={Link}
                variant="menu"
                onClick={exitOnClick}
                title={menuItem.name}
                to={`/${menuItem.url_key}`}
                key={`${menuItem.id}_${String(i)}`}
                onMouseEnter={handleEnter(menuItem.id)}
              >
                {menuItem.name === 'Hot Deals' ? (
                  <Fragment>
                    <LabelHtV1 as={AbsoluteHtV1} variant="menuNew">
                      New
                    </LabelHtV1>
                    {menuItem.name}
                  </Fragment>
                ) : (
                  menuItem.name
                )}
              </TextHtV1>
            ))}
            <TextHtV1
              as={Link}
              variant="menu"
              to="/modular-kitchens"
              title="Modular Kitchens"
              target="_blank"
              rel="noopener noreferrer"
              onClick={exitOnClick}
            >
              {'Modular Kitchens'}
            </TextHtV1>
            <BoxHtV1 sx={{ position: 'relative' }}>
              <ButtonHtV1 padding="10px 15px 10px 0px" variant="buttons.outline">
                More
              </ButtonHtV1>
              <AbsoluteHtV1 zIndex={2} bg="white" border="dropdown">
                <UlHtV1 pl={0}>
                  {more &&
                    more.map((menuItem, i) => (
                      <LiHtV1 key={`${menuItem.id}_${String(i)}`}>
                        <Link
                          onClick={exitOnClick}
                          onMouseEnter={handleEnter('')}
                          title={menuItem.name}
                          to={`/${menuItem.url_key}`}
                        >
                          {menuItem.name || 'Hometown'}
                        </Link>
                      </LiHtV1>
                    ))}
                  <LiHtV1>
                    <Link onClick={exitOnClick} to="/bulk-order" onMouseEnter={handleEnter('')} title="Bulk Order">
                      Bulk Order
                    </Link>
                  </LiHtV1>
                  <LiHtV1>
                    <Link
                      to="/design-build"
                      title="Design & Build"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={exitOnClick}
                    >
                      Design & Build
                    </Link>
                  </LiHtV1>
                  <LiHtV1>
                    <LinkRedirectHtV1
                      href="https://hometown.in/media/Institutional+Catalogue.pdf"
                      title="Festive Gifts Catalogue"
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gifting Catalogue
                    </LinkRedirectHtV1>
                  </LiHtV1>
                </UlHtV1>
              </AbsoluteHtV1>
            </BoxHtV1>
          </RowHtV1>
        </ContainerHtV1>
      </BoxHtV1>
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

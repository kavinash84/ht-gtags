import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Components
 */
import Absolute from 'hometown-components-dev/lib/AbsoluteHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Card from 'hometown-components-dev/lib/CardHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import LinkRedirect from 'hometown-components-dev/lib/LinkRedirectHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

// const { SITE_URL } = process.env;

const MoreButton = styled(Button)`
  ~ ${Card} {
    display: none;
    &:hover,
    &:focus {
      display: block;
    }
  }
  &:hover,
  &:focus {
    ~ ${Card} {
      display: block;
    }
  }
`;

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
      <Box onMouseLeave={handleLeave}>
        <Container pr="0" pl="0">
          <Row variant="row.nav">
            {main.map((menuItem, i) => (
              <Text
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
                    <Label as={Absolute} variant="menuNew">
                      New
                    </Label>
                    {menuItem.name}
                  </Fragment>
                ) : (
                  menuItem.name
                )}
              </Text>
            ))}
            <Text
              as={Link}
              variant="menu"
              to="/modular-kitchens"
              title="Modular Kitchens"
              target="_blank"
              rel="noopener noreferrer"
              onClick={exitOnClick}
            >
              Modular Kitchens
            </Text>

            {/* More Button */}
            <Box sx={{ position: 'relative' }}>
              <MoreButton variant="link">
                <Text variant="menu">More</Text>
              </MoreButton>
              <Card variant="card.moreDropdown" px={0} py={0}>
                {more &&
                  more.map((menuItem, i) => (
                    <Box>
                      <Text
                        as={Link}
                        variant="menuLight"
                        onClick={exitOnClick}
                        onMouseEnter={handleEnter('')}
                        title={menuItem.name}
                        to={`/${menuItem.url_key}`}
                        key={`${menuItem.id}_${String(i)}`}
                      >
                        {menuItem.name || 'Hometown'}
                      </Text>
                    </Box>
                  ))}
                <Box>
                  <Text
                    as={Link}
                    variant="menuLight"
                    onClick={exitOnClick}
                    to="/bulk-order"
                    onMouseEnter={handleEnter('')}
                    title="Bulk Order"
                  >
                    Bulk Order
                  </Text>
                </Box>
                <Box>
                  <Text
                    as={Link}
                    variant="menuLight"
                    to="/design-build"
                    title="Design & Build"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={exitOnClick}
                  >
                    Design & Build
                  </Text>
                </Box>
                <Box>
                  <Text
                    as={LinkRedirect}
                    variant="menuLight"
                    href="https://hometown.in/media/Institutional+Catalogue.pdf"
                    title="Festive Gifts Catalogue"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gifting Catalogue
                  </Text>
                </Box>
              </Card>
            </Box>
          </Row>
        </Container>
      </Box>
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

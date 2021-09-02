import React, { Fragment, Component } from 'react';
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
import Image from 'hometown-components-dev/lib/ImageHtV1';

const dropdown = require('../../../static/dropdown_arrow.svg');

class NavBar extends Component {
  render() {
    const {
 menuItems, handleEnter, handleLeave, handleClick, exitOnClick
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
        <Container pr="0" pl="0" sx={{ overflowX: ['auto', 'auto', 'inherit'] }}>
          <Row variant="row.nav" pt={[8, 8, 0]}>
            {main.map((menuItem, i) => (
              <Fragment>
                {menuItem.url_key.startsWith('http') ? (
                  <Box>
                    <Text
                      as={LinkRedirect}
                      variant="menuLight"
                      href={menuItem.url_key}
                      title={menuItem.name}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {menuItem.name}
                    </Text>
                  </Box>
                ) : (
                  <Text
                    as={Link}
                    variant="menu"
                    onClick={exitOnClick}
                    title={menuItem.name}
                    to={`/${menuItem.url_key}`}
                    key={`${menuItem.id}_${String(i)}`}
                    onMouseEnter={handleEnter(menuItem.id)}
                    minWidth="auto"
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
                )}

                <Image
                  display={['block', 'block', 'none']}
                  width={12}
                  ml={4}
                  mb={-2}
                  src={dropdown}
                  alt=""
                  onClick={handleClick(menuItem.id)}
                  sx={{ flexShrink: 0 }}
                />
              </Fragment>
            ))}
            {/* <Link
              href="https://beta.hometown.in/modular-kitchens/"
              to="/modular-kitchens"
              title="Modular Kitchens"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                fontFamily: 'medium',
                color: 'black'
              }}
            >
              Modular Kitchens
            </Link> */}

            {/* More Button */}
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="link"
                minWidth="auto"
                sx={{
                  '& ~ div': {
                    display: 'none',
                    '&:hover': {
                      display: 'block'
                    }
                  },
                  '&:hover': {
                    '& ~ div': {
                      display: 'block'
                    }
                  }
                }}
              >
                <Box display="flex">
                  <Text variant="menu">More</Text>
                  <Image
                    display={['block', 'block', 'none']}
                    width={12}
                    ml={12}
                    mr={9}
                    mb={-2}
                    src={dropdown}
                    alt=""
                    onClick={handleClick('10')}
                    sx={{ flexShrink: 0 }}
                  />
                </Box>
              </Button>
              <Image
                sx={{
                  '& ~ div': {
                    display: 'none'
                  },
                  '&:click': {
                    '& ~ div': {
                      display: 'block'
                    }
                  }
                }}
                display={['block', 'block', 'none']}
                width={12}
                ml={4}
                mb={-2}
                src={dropdown}
                alt=""
              />
              <Card sx={{ position: 'absolute', zIndex: '1111' }} variant="card.moreDropdown" px={0} py={0}>
                {more &&
                  more.map((menuItem, i) => {
                    if (menuItem.url_key.startsWith('http')) {
                      return (
                        <Box>
                          <Text
                            as={LinkRedirect}
                            variant="menuLight"
                            href={menuItem.url_key}
                            title={menuItem.name}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {menuItem.name}
                          </Text>
                        </Box>
                      );
                    }
                    return (
                      <Box key={`${menuItem.id}_${String(i)}`}>
                        <Text
                          as={Link}
                          variant="menuLight"
                          onClick={exitOnClick}
                          onMouseEnter={handleEnter('')}
                          title={menuItem.name}
                          to={`/${menuItem.url_key}`}
                        >
                          {menuItem.name || 'Hometown'}
                        </Text>
                      </Box>
                    );
                  })}
                {/* <Box>
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
                    to="/design-build/"
                    // href="https://stage.hometown.in/design-build/"
                    title="Design & Build"
                    target="_blank"
                    rel="noopener noreferrer"
                    // onClick={exitOnClick}
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
                <Box>
                  <Text
                    as={LinkRedirect}
                    variant="menuLight"
                    href="https://blog.hometown.in"
                    title="Hometown Blog"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog
                  </Text>
                </Box> */}
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
  handleClick: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
  exitOnClick: PropTypes.func.isRequired
};

export default NavBar;

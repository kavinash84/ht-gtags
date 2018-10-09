import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HOME_URL } from 'helpers/Constants';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';

const styles = require('./ModularKitchen.scss');

const mkLogo = require('../../../static/mkLogo.png');
const LogoIcon = require('../../../static/logo.png');
const PhoneIcon = require('../../../static/phone-icon.svg');

const Header = () => (
  <Section p="20px 0" mb="0">
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Row ml="0" mr="0">
        <Div col="7">
          <Link to={HOME_URL}>
            <Img float="left" height="40px" src={LogoIcon} alt="Hometown" />
          </Link>
          <Link to="/modular-kitchens-micro">
            <Img height="40px" width="auto" mr="15px" float="left" src={mkLogo} alt="" />
          </Link>
          <Text color="#614839">The world of stylist and durable kitchens</Text>
        </Div>
        <Div col="5" ta="right">
          <ul className={styles.menuMk}>
            <li>
              <Link to="/modular-kitchens-micro">Home</Link>
            </li>
            <li>
              <Link to="/plan-your-kitchen">Plan Your Kitchen</Link>
            </li>
            <li>
              <Link to="/store-locator">Store Locator</Link>
            </li>
            <li>
              <a href="tel:18002100004">
                <Span fontSize="0.875rem">
                  <Img src={PhoneIcon} alt="Hometown" height="24px" mr="0.3125rem" float="left" />
                  1800-210-0004
                </Span>
              </a>
            </li>
          </ul>
        </Div>
      </Row>
    </Container>
  </Section>
);

export default Header;

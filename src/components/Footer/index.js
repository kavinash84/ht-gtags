import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Button from 'hometown-components/lib/Buttons';
import { HOME_URL } from 'helpers/Constants';

const LogoIcon = require('../../../static/logo.png');

const fbIcon = require('../../../static/facebook.svg');
const twIcon = require('../../../static/twitter.svg');
const ytIcon = require('../../../static/youtube.svg');
const instaIcon = require('../../../static/instagram.svg');
const pinIcon = require('../../../static/pinterest.svg');
const ourAppIcon = require('../../../static/google-play-store.svg');
const aeIcon = require('../../../static/american-express.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');
const intBankingIcon = require('../../../static/net-banking.png');
const styles = require('./Footer.scss');

const mapStateToProps = ({ homepage }) => ({
  menuItems: homepage.menu.data
});

const Footer = ({ menuItems }) => (
  <Div mb="0" p="0" pt="15px" pb="0" className={styles.footer}>
    <Section bg="footerTop" mb="0" p="2.5rem 0 0">
      <Container pr="0" pl="0">
        <Row m="0" flexWrap="nowrap">
          <Div col="6">
            <Div col="9">
              <FormInput label="" type="text" placeholder="" />
            </Div>
            <Div col="3">
              <Button
                btnType="primary"
                boder="solid 1px rgba(151,151,151,0.47)"
                fontFamily="regular"
                height="38px"
                mt="0"
                ml="-1px"
              >
                Subscribe
              </Button>
            </Div>
          </Div>
          <Div col="3">
            <Heading color="white" fontFamily="light" fontSize="1em" mt="0">
              CONTACT US
            </Heading>
            <ul>
              <li>
                <a href="tel:1800-210-0004">Call Us: 1800-210-0004</a>
              </li>
              <li>
                <a href="mailto:care@hometown.in">Email: care@hometown.in</a>
              </li>
            </ul>
          </Div>
          <Div col="3">
            <Heading color="white" fontFamily="light" fontSize="1em" mt="0">
              FOLLOW US
            </Heading>
            <ul className={styles.socials}>
              <li>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/hometown.in/">
                  <Img src={fbIcon} alt="Facebook" />
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/HomeTown_In/">
                  <Img src={twIcon} alt="Twitter" />
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/hometown_in/?hl=en">
                  <Img src={instaIcon} alt="Facebook" />
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=gfLZgzaSlmg">
                  <Img src={ytIcon} alt="Facebook" />
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href="https://in.pinterest.com/hometownstore/">
                  <Img src={pinIcon} alt="Facebook" />
                </a>
              </li>
            </ul>
          </Div>
        </Row>
      </Container>
    </Section>
    <Section bg="footerTop" mb="0" p="0.625rem 0 2rem">
      <Container pr="0" pl="0">
        <Row m="0" mb="1rem" flexWrap="nowrap">
          {menuItems.map(menu =>
            menu.children && (
              <Div key={menu.name} display="flexEqual" col="2">
                <Heading color="white" fontFamily="light" fontSize="1em" mt="1rem" pb="2px">
                  {menu.name}
                </Heading>
                <ul>
                  {menu.children.map(subMenu => (
                    <li key={subMenu.name}>
                      <Link to={subMenu.url_key}>{subMenu.name}</Link>
                    </li>
                  ))}
                </ul>
              </Div>
            ))}
        </Row>
        <Row m="0" flexWrap="nowrap">
          <Div display="flexEqual" col="2">
            <Heading color="white" fontFamily="light" fontSize="1em" mt="1rem">
              ABOUT US
            </Heading>
            <ul>
              <li>
                <Link to="/who-we-are">Who We Are</Link>
              </li>
              <li>
                <a href="http://praxisretail.in/careers.html" rel="noreferrer noopener" target="_blank">
                  Careers
                </a>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </Div>
          <Div display="flexEqual" col="2">
            <Heading color="white" fontFamily="light" fontSize="1em" mt="1rem">
              CUSTOMER SERVICE
            </Heading>
            <ul>
              <li>
                <Link to="/track-order">Track Order</Link>
              </li>
              <li>
                <Link to="/return-policy">Returns</Link>
              </li>
              <li>
                <Link to="/cancellation">Cancellation</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms and Conditions</Link>
              </li>
            </ul>
          </Div>
          <Div display="flexEqual" col="2">
            <Heading color="white" fontFamily="light" fontSize="1em" mt="1rem">
              Useful Links
            </Heading>
            <ul>
              <li>
                <Link to="/sitemap.xml">Sitemap</Link>
              </li>
            </ul>
          </Div>
          <Div display="flexEqual" col="3">
            <Heading color="white" fontFamily="light" fontSize="1em" mt="1rem">
              OUR APP
            </Heading>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://play.google.com/store/apps/details?id=com.fabfurnish.android"
            >
              <Img src={ourAppIcon} alt="Our App" mt="1.2rem" width="178px" />
            </a>
          </Div>
          <Div display="flexEqual" col="3">
            <Heading color="white" fontFamily="light" fontSize="1em" mt="1rem">
              PAYMENT METHOD
            </Heading>
            <Row ml="0" mr="0" className={styles.paymentWrapper}>
              <Div col="2" p="0 5px">
                <Img src={visaIcon} alt="visaCard" width="100%" />
              </Div>
              <Div col="2" p="0 5px">
                <Img src={mastercardIcon} alt="Master Card" width="100%" />
              </Div>
              <Div col="2" p="0 5px">
                <Img src={maestroIcon} alt="Maestro" width="100%" />
              </Div>
              <Div col="2" p="0 5px">
                <Img src={aeIcon} alt="Amex" width="100%" />
              </Div>
              <Div col="2" p="0 5px">
                <Img src={intBankingIcon} alt="Internet Banking" width="100%" />
              </Div>
            </Row>
          </Div>
        </Row>
      </Container>
    </Section>
    <Section bg="footerBottom" mb="0" p="0.625rem 0">
      <Container pr="0" pl="0">
        <Row m="0">
          <Div col={6}>
            <Link to={HOME_URL}>
              <Img src={LogoIcon} className={styles.footerLogo} alt="Hometown" height="40px" />
            </Link>
          </Div>
          <Div col={6} ta="right" alignSelf="center">
            <Text color="#a6a6a6" fontSize="0.875rem" mt="0" mb="0" lh="2" ta="right">
              © 2018 Praxis Home Retail Limited
            </Text>
          </Div>
        </Row>
      </Container>
    </Section>
  </Div>
);

Footer.defaultProps = {
  menuItems: []
};
Footer.propTypes = {
  menuItems: PropTypes.array
};
export default connect(
  mapStateToProps,
  null
)(Footer);

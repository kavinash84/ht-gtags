import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';
import { Label } from 'hometown-components/lib/Label';

const fbIcon = require('../../../static/facebook.svg');
const twIcon = require('../../../static/twitter.svg');
const ytIcon = require('../../../static/youtube.svg');
const instaIcon = require('../../../static/instagram.svg');
const pinIcon = require('../../../static/pinterest.svg');
const ourAppIcon = require('../../../static/google-play-store.svg');
const paymentMethodIcon = require('../../../static/paymentMethodIcon.jpg');
const styles = require('./Footer.scss');

const mapStateToProps = ({
  homepage: {
    footer: { data }
  }
}) => ({
  categories: data.items && data.items.text.top_categories.values
});

const Footer = ({ categories }) => (
  <div mb="0" p="0" pt="15px" className={styles.footer}>
    <Section bg="footerTop" mb="0" p="2rem 0">
      <Container pr="0" pl="0">
        <Row m="0">
          <Div col={3}>
            <Heading color="white" fontSize="1em" mt="1rem">
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
          <Div col={3}>
            <Heading color="white" fontSize="1em" mt="1rem">
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
          <Div col={3}>
            <Heading color="white" fontSize="1em" mt="1rem">
              TOP CATEGORIES
            </Heading>
            <ul>
              {categories.map((category, index) => (
                <li key={String(index)}>
                  <Link to={category.url_key}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </Div>
          <Div col={3}>
            <Heading color="white" fontSize="1em" mt="1rem">
              PAYMENT METHOD
            </Heading>
            <Img src={paymentMethodIcon} alt="Payment Method" mt="1.2rem" width="178px" />
            <Heading color="white" fontSize="1em" mt="2rem">
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
        </Row>
      </Container>
    </Section>
    <Section bg="footerBottom" mb="0" p="1.25rem 0">
      <Container pr="0" pl="0">
        <Row m="0">
          <Div col={6}>
            <Text color="#a6a6a6" fontSize="1rem" mt="0" mb="0" lh="2">
              Copyright reserved @ 2018
            </Text>
          </Div>
          <Div col={6} ta="right">
            <Label mr="1rem" va="super" color="footerText" fontSize="1rem">
              Follow Us
            </Label>
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
  </div>
);

Footer.defaultProps = {
  categories: []
};

Footer.propTypes = {
  categories: PropTypes.array
};

export default connect(
  mapStateToProps,
  null
)(Footer);

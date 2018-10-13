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
import { validateEmail } from 'utils/validation';
import { sendData } from 'redux/modules/services';
import { SUBSCRIPTION as SUBSCRIPTION_API } from 'helpers/apiUrls';

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
const walletIcon = require('../../../static/wallet.svg');
const styles = require('./Footer.scss');
const { version } = require('../../../package.json');

const FooterLinks = ['Furniture', 'Home Furnishings', 'Home Décor', 'Home Decor', 'Tableware', 'Kitchenware', 'Bath'];

const mapStateToProps = ({ services, homepage, notifs }) => ({
  menuItems: homepage.menu.data,
  subscribe: services.footer,
  notifs
});

class Footer extends React.Component {
  state = {
    email: '',
    emailError: false,
    emailErrorMessage: 'Please Enter a Valid Email',
    already: false
  };
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.subscribe;
    const { already } = this.state;
    if (loaded && !loading && !already) {
      this.setState({
        email: '',
        already: true
      });
    }
  }
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { sendFormData } = this.props;
    const { email } = this.state;
    const emailError = !validateEmail(email);
    if (emailError) {
      return this.setState({
        emailError
      });
    }
    const data = {
      email
    };
    sendFormData(SUBSCRIPTION_API, data, 'footer');
  };
  render() {
    let { menuItems } = this.props;
    menuItems = menuItems.filter(item => FooterLinks.includes(item.name));
    const {
      email, emailError, emailErrorMessage, already
    } = this.state;
    return (
      <Div mb="0" p="0" pt="15px" pb="0" className={styles.footer}>
        <Section bg="footerTop" mb="0" p="2.5rem 0 0">
          <Container pr="0" pl="0">
            <Row m="0" flexWrap="nowrap">
              <Div col="6">
                {!already ? (
                  <form onSubmit={this.handleSubmit}>
                    <Div col="9">
                      <FormInput
                        label=""
                        onChange={this.onChangeEmail}
                        value={email}
                        type="text"
                        placeholder=""
                        feedBackError={emailError}
                        feedBackMessage={emailErrorMessage}
                      />
                    </Div>
                    <Div col="3">
                      <Button
                        btnType="primary"
                        boder="solid 1px rgba(151,151,151,0.47)"
                        fontFamily="regular"
                        height="38px"
                        mt="0"
                        ml="-1px"
                        onClick={this.handleSubmit}
                      >
                        Subscribe
                      </Button>
                    </Div>
                  </form>
                ) : (
                  <Text color="green" fontSize="0.955rem" mt="0" mb="0" lh="2" ta="left">
                    You have been successfully subscribed to the Newsletter
                  </Text>
                )}
              </Div>
              <Div col="3">
                <Heading color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="0">
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
                <Heading color="footerHeading" fontFamily="regular" fontSize="1em" mt="0">
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
                      <Img src={instaIcon} alt="Instagram" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=gfLZgzaSlmg">
                      <Img src={ytIcon} alt="Youtube" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://in.pinterest.com/hometownstore/">
                      <Img src={pinIcon} alt="Pinterest" />
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
                menu.children &&
                  menu.visibility === 'on' && (
                  <Div key={menu.name} display="flexEqual">
                    <Heading color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                      {menu.name}
                    </Heading>
                    <ul>
                      {/*eslint-disable*/}
                        {menu.children.map(
                          (subMenu, index) =>
                            subMenu.visibility === 'on' &&
                            index < 11 && (
                              <li key={subMenu.name}>
                                <Link to={`/${subMenu.url_key}`}>{subMenu.name}</Link>
                              </li>
                            )
                        )}
                        {/* eslint-enable */}
                    </ul>
                  </Div>
                ))}
            </Row>
            <Row m="0" flexWrap="nowrap">
              <Div display="flexEqual" col="2">
                <Heading color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
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
                <Heading color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
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
                <Heading color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                  USEFUL LINKS
                </Heading>
                <ul>
                  <li>
                    <Link to="/sitemap.html">Sitemap</Link>
                  </li>
                  <li>
                    <Link to="/promotions">Promotions</Link>
                  </li>
                </ul>
              </Div>
              <Div display="flexEqual" col="3">
                <Heading color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
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
                <Heading color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                  PAYMENT METHODS
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
                  <Div col="2" p="5px 5px 0">
                    <Img src={intBankingIcon} alt="Internet Banking" width="100%" />
                  </Div>
                  <Div col="2" p="3px 5px">
                    <Img src={walletIcon} height="22px" alt="Wallet" width="100%" />
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
              <Div col={6} ta="left" alignSelf="center">
                <Text color="#a6a6a6" fontSize="0.875rem" mt="0" mb="0" lh="2" ta="right">
                  version: {version}
                </Text>
                <Text color="#a6a6a6" fontSize="0.875rem" mt="0" mb="0" lh="2" ta="right">
                  © {new Date().getFullYear()} Praxis Home Retail Limited
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

Footer.defaultProps = {
  menuItems: [],
  subscribe: {}
};

Footer.propTypes = {
  menuItems: PropTypes.array,
  sendFormData: PropTypes.func.isRequired,
  subscribe: PropTypes.object
};
export default connect(
  mapStateToProps,
  { sendFormData: sendData }
)(Footer);

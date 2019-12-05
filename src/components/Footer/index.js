import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'hometown-components-dev/lib/Container';
import Row from 'hometown-components-dev/lib/Row';
import Div from 'hometown-components-dev/lib/Div';
import HeadingH4 from 'hometown-components-dev/lib/HeadingH4';
import Img from 'hometown-components-dev/lib/Img';
import Section from 'hometown-components-dev/lib/Section';
import Text from 'hometown-components-dev/lib/Text';
import FormInput from 'hometown-components-dev/lib/Forms/FormInput';
import Button from 'hometown-components-dev/lib/Buttons';
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
  // componentDidMount() {
  //   if (!window._laq) {
  //     window._laq = [];
  //   }
  //   window._laq.push(() => {
  //     window.liveagent.showWhenOnline(
  //       '573N000000000Ub',
  //       document.getElementById('liveagent_button_online_573N000000000Ub')
  //     ); //eslint-disable-line
  //     window.liveagent.showWhenOffline(
  //       '573N000000000Ub',
  //       document.getElementById('liveagent_button_offline_573N000000000Ub')
  //     ); //eslint-disable-line
  //   });
  //   const emailId = '';
  //   // Example : liveagent.addCustomDetail('Contact_ID', test@gmail.com);
  //   window.liveagent.addCustomDetail('Contact_ID', emailId);
  //   window.liveagent.init(
  // 'https://d.la1-c2cs-hnd.salesforceliveagent.com/chat',
  // '572N000000000PC',
  // '00DN0000000Qxcj'
  // );
  // }
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
                <HeadingH4 color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="0">
                  CONTACT US
                </HeadingH4>
                <ul>
                  <li>
                    <a href="tel:1800-210-0004">Call Us: 1800-210-0004</a>
                  </li>
                  <li>
                    <a href="mailto:care@hometown.in">Email: care@hometown.in</a>
                  </li>
                  <li>
                    <Img
                      id="liveagent_button_online_573N000000000Ub"
                      style={{
                        display: 'none',
                        border: '0px none',
                        cursor: 'pointer',
                        height: '75px',
                        width: '200px'
                      }}
                      onClick={() => {
                        if (window.liveagent) {
                          window.liveagent.startChat('573N000000000Ub');
                        }
                      }}
                      src="https://devbox-praxisretail.cs6.force.com/LiveAgent/resource/1550482657000/Online_Chat_Button" //eslint-disable-line
                      alt=""
                    />
                    <Img
                      id="liveagent_button_offline_573N000000000Ub"
                      style={{
                        display: 'none',
                        border: '0px none',
                        cursor: 'pointer',
                        height: '75px',
                        width: '200px'
                      }}
                      onClick={() => {
                        if (window.liveagent) {
                          window.liveagent.startChat('573N000000000Ub');
                        }
                      }}
                      src="https://devbox-praxisretail.cs6.force.com/LiveAgent/resource/1550482682000/Offline_Chat_Button" //eslint-disable-line
                      alt=""
                    />
                  </li>
                </ul>
              </Div>
              <Div col="3">
                <HeadingH4 color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="0">
                  FOLLOW US
                </HeadingH4>
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
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/hometownindia/">
                      <Img src={instaIcon} alt="Instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.youtube.com/channel/UCBZGArWnKT6MYYwOsPCNjiw"
                    >
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
                    <HeadingH4 color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                      {menu.name}
                    </HeadingH4>
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
                <HeadingH4 color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                  ABOUT US
                </HeadingH4>
                <ul>
                  <li>
                    <Link to="/who-we-are">Who We Are</Link>
                  </li>
                  <li>
                    <a href="https://www.praxisretail.in/careers.html" rel="noreferrer noopener" target="_blank">
                      Careers
                    </a>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </Div>
              <Div display="flexEqual" col="2">
                <HeadingH4 color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                  CUSTOMER SERVICE
                </HeadingH4>
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
                <HeadingH4 color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                  USEFUL LINKS
                </HeadingH4>
                <ul>
                  <li>
                    <a href="/sitemap.html" target="_blank">
                      Sitemap
                    </a>
                  </li>
                  <li>
                    <Link to="/promotions">Promotions</Link>
                  </li>
                </ul>
              </Div>
              <Div display="flexEqual" col="3">
                <HeadingH4 color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                  OUR APP
                </HeadingH4>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.fabfurnish.android"
                >
                  <Img src={ourAppIcon} alt="Our App" mt="1.2rem" width="178px" />
                </a>
              </Div>
              <Div display="flexEqual" col="3">
                <HeadingH4 color="footerHeading" fontFamily="regular" fontSize="1.125rem" mt="1rem" pb="2px">
                  PAYMENT METHODS
                </HeadingH4>
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
                  <Img
                    src={LogoIcon}
                    className={styles.footerLogo}
                    alt="Hometown"
                    height="40px"
                    float="left"
                    mr="1.5rem"
                  />
                </Link>
                <Text color="#a6a6a6" fontSize="0.875rem" mb="0" lh="2" ta="left" mt="7px">
                  © {new Date().getFullYear()} Praxis Home Retail Limited
                </Text>
              </Div>
              <Div col={6} ta="left" alignSelf="center">
                <Text color="rgba(166, 166, 166, 0.5)" fontSize="0.75rem" mt="0" mb="0" lh="2" ta="right" pr="4.5rem">
                  v {version}
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

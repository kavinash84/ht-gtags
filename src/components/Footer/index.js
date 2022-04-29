import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * Helpers
 */
import { validateEmail } from "utils/validation";
import { sendData } from "redux/modules/services";
import { SUBSCRIPTION as SUBSCRIPTION_API } from "helpers/apiUrls";

/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import CallIcon from "hometown-components-dev/lib/Icons/CallHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import FormInput from "hometown-components-dev/lib/FormsHtV1/FormInputHtV1";
import EmailIcon from "hometown-components-dev/lib/Icons/EmailHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Li from "hometown-components-dev/lib/LiHtV1";
import LocationIcon from "hometown-components-dev/lib/Icons/LocationHtV1";
import LinkRedirect from "hometown-components-dev/lib/LinkRedirectHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Ul from "hometown-components-dev/lib/UlHtV1";

/**
 * Icons
 */
const fbIcon = require("../../../static/facebook.svg");
const twIcon = require("../../../static/twitter.svg");
const youtubeIcon = require("../../../static/youtube.svg");
const instaIcon = require("../../../static/instagram.svg");
const pinIcon = require("../../../static/pinterest.svg");
// const bajajFinserveIcon = require('../../../static/bajaj-finserv.png');
const ourAppIcon = require("../../../static/google-play-store.svg");

const FooterLinks = [
  "Furniture",
  "Home Furnishings",
  "Home Décor",
  "Home Decor",
  "Tableware",
  "Tableware & Kitchenware",
  "Kitchenware",
  "Bath"
];

const mapStateToProps = ({ services, homepage, notifs }) => ({
  menuItems: homepage.menu.data,
  subscribe: services.footer,
  notifs
});

const FooterMenuLink = ({ to, title }) => (
  <Li>
    <Link to={to}>
      <Text variant="footerLink">{title}</Text>
    </Link>
  </Li>
);

const SocialLink = props => <LinkRedirect {...props} />;

FooterMenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

class Footer extends React.Component {
  state = {
    email: "",
    emailError: false,
    emailErrorMessage: "Please Enter a Valid Email",
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
        email: "",
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
    sendFormData(SUBSCRIPTION_API, data, "footer");
  };

  render() {
    let { menuItems } = this.props;
    menuItems = menuItems.filter(item => FooterLinks.includes(item.name));

    const { email, emailError, emailErrorMessage, already } = this.state;
    return (
      <Section bg="bgFooter" pt={30} pb={10} mb={0}>
        <Container variant="container">
          <Row m="0" mb="2rem" flexWrap="nowrap" justifyContent="space-between">
            {menuItems.map(
              menu =>
                menu.children &&
                menu.visibility === "on" && (
                  <Box key={menu.name} display="flexEqual">
                    <Heading
                      color="footerHeading"
                      fontFamily="regular"
                      fontSize="1.125rem"
                      mt="1rem"
                      pb="18px"
                    >
                      {menu.name}
                    </Heading>
                    <Ul>
                      {/*eslint-disable*/}
                      {menu.children.map(
                        (subMenu, index) =>
                          subMenu.visibility === "on" &&
                          index < 11 && (
                            <Li key={subMenu.name}>
                              <Link to={`/${subMenu.url_key}`}>
                                <Text variant="footerLink">
                                  {" "}
                                  {subMenu.name}
                                </Text>
                              </Link>
                            </Li>
                          )
                      )}
                      {/* eslint-enable */}
                    </Ul>
                  </Box>
                )
            )}
          </Row>
          <Row>
            <Col width={[1, 2 / 3, 3 / 12]}>
              <Box mb={24}>
                <Heading variant="footerTitle">CUSTOMER SERVICE</Heading>
                <Ul>
                  <FooterMenuLink to="/track-order" title="Track Order" />
                  <FooterMenuLink to="/return-policy" title="Returns" />
                  <FooterMenuLink to="/cancellation" title="Cancellation" />
                  <FooterMenuLink to="/faq" title="FAQ" />
                  <FooterMenuLink to="/privacy-policy" title="Privacy Policy" />
                  <FooterMenuLink
                    to="/terms-and-conditions"
                    title="Terms and Conditions"
                  />
                </Ul>
              </Box>
              {/* <Box>
                <Heading variant="footerTitle">ABOUT US</Heading>
                <Ul>
                  <FooterMenuLink to="/who-we-are" title="Who We Are" />
                  <Li>
                    <a
                      href="https://www.praxisretail.in/careers.html"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <Text variant="footerLink">Careers</Text>
                    </a>
                  </Li>
                  <FooterMenuLink to="/contact-us" title="Contact Us" />
                </Ul>
              </Box> */}
            </Col>
            <Col width={[1, 2 / 3, 2 / 12]}>
              <Box mb={24}>
                <Heading variant="footerTitle">USEFUL LINKS</Heading>
                <Ul>
                  <Li>
                    <a
                      href="/sitemap.html"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <Text variant="footerLink">Sitemap</Text>
                    </a>
                  </Li>
                  <FooterMenuLink to="/promotions" title="Promotions" />
                </Ul>
              </Box>
              <Box>
                {/* <Heading variant="footerTitle">CATALOG</Heading>
                <Ul>
                  <Li>
                    <a href="/" rel="noreferrer noopener" target="_blank">
                      <Text variant="footerLink">Catalog Request</Text>
                    </a>
                  </Li>
                  <Li>
                    <a href="/" rel="noreferrer noopener" target="_blank">
                      <Text variant="footerLink">eCatalogs</Text>
                    </a>
                  </Li>
                </Ul> */}
                {/* <Image src={bajajFinserveIcon} alt="Bajaj Finserv" mt={20} /> */}
              </Box>
            </Col>
            <Col width={[1, 2 / 3, 3 / 12]}>
              <Box mb={24}>
                <Heading variant="footerTitle">CONTACT US</Heading>
                <Ul>
                  <Li>
                    <a
                      href="tel:1800-210-0004"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {/* <Text variant="footerLink" fontSize={16}>
                        <CallIcon mr={10} /> 1800-210-0004
                      </Text> */}
                    </a>
                  </Li>
                  <Li>
                    <a
                      href="mailto:care@hometown.in"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <Text variant="footerLink" fontSize={16}>
                        <EmailIcon mr={10} />
                        care@hometown.in
                      </Text>
                    </a>
                  </Li>
                  <Li>
                    <Link to="/store-locator">
                      <Text variant="footerLink" fontSize={16}>
                        <LocationIcon mr={10} />
                        Store Locator
                      </Text>
                    </Link>
                  </Li>
                </Ul>
              </Box>
              <Box mb={15}>
                <Heading variant="footerTitle">OUR APP</Heading>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.fabfurnish.android"
                >
                  <Image
                    src={ourAppIcon}
                    alt="Our App"
                    mt="1rem"
                    width="178px"
                  />
                </a>
              </Box>
            </Col>
            <Col width={[1, 1, 4 / 12]} pl={[0, 0, 50]}>
              <Box
                mb={17}
                sx={{
                  borderBottom: "divider",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Text
                  variant="footerLink"
                  px={24}
                  sx={{ position: "relative", bg: "bgFooter", top: 12 }}
                >
                  Subscribe Newsletter
                </Text>
              </Box>
              {!already ? (
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Box width={9 / 12}>
                      <FormInput
                        label=""
                        onChange={this.onChangeEmail}
                        value={email}
                        type="text"
                        feedBackError={emailError}
                        feedBackMessage={emailErrorMessage}
                        variant="inputSearch"
                        placeholder="Enter your email address"
                      />
                    </Box>
                    <Box width={3 / 12}>
                      <Button onClick={this.handleSubmit}>Subscribe</Button>
                    </Box>
                  </Row>
                </form>
              ) : (
                <Row>
                  <Text
                    color="green"
                    fontSize="0.955rem"
                    mt="0"
                    mb="0"
                    lh="2"
                    ta="left"
                  >
                    You have been successfully subscribed to the Newsletter
                  </Text>
                </Row>
              )}
              <Row
                mt={15}
                sx={{ justifyContent: "space-between" }}
                width="40px"
                display="flex"
              >
                <SocialLink
                  target="_blank"
                  href="https://www.facebook.com/hometown.in/"
                >
                  <Image src={fbIcon} alt="Facebook" />
                </SocialLink>
                <SocialLink
                  target="_blank"
                  href="https://twitter.com/HomeTown_In/"
                >
                  <Image src={twIcon} alt="Twitter" />
                </SocialLink>
                <SocialLink
                  target="_blank"
                  href="https://www.youtube.com/channel/UCBZGArWnKT6MYYwOsPCNjiw"
                >
                  <Image src={youtubeIcon} alt="Youtube" />
                </SocialLink>
                <SocialLink
                  target="_blank"
                  href="https://www.instagram.com/hometownindia/"
                >
                  <Image src={instaIcon} alt="Instagram" />
                </SocialLink>
                <SocialLink
                  target="_blank"
                  href="https://in.pinterest.com/hometownstore/"
                >
                  <Image src={pinIcon} alt="Pinterest" />
                </SocialLink>
              </Row>
            </Col>
          </Row>
          <Row variant="row.contentCenter" mt={30}>
            <Text variant="footerLink" fontSize={16}>
              © {new Date().getFullYear()} Praxis Home Retail Limited
            </Text>
          </Row>
        </Container>
      </Section>
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
export default connect(mapStateToProps, { sendFormData: sendData })(Footer);

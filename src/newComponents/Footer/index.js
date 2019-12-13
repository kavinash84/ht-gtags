import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Helpers
 */
import { validateEmail } from 'utils/validation';
import { sendData } from 'redux/modules/services';
import { SUBSCRIPTION as SUBSCRIPTION_API } from 'helpers/apiUrls';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
// import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Ul from 'hometown-components-dev/lib/UlHtV1';
import Li from 'hometown-components-dev/lib/LiHtV1';

/**
 * Icons
 */
// const fbIcon = require('../../../static/facebook.svg');
// const twIcon = require('../../../static/twitter.svg');
// const ytIcon = require('../../../static/youtube.svg');
// const instaIcon = require('../../../static/instagram.svg');
// const pinIcon = require('../../../static/pinterest.svg');

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

FooterMenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

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
    // let { menuItems } = this.props;
    // menuItems = menuItems.filter(item => FooterLinks.includes(item.name));

    const {
 email, emailError, emailErrorMessage, already
} = this.state;
    return (
      <Section bg="bgFooter" pt={30} pb={10}>
        <Container variant="container">
          <Row>
            <Col width={[1, 2 / 3, 2 / 12]}>
              <Box mb={24}>
                <Heading variant="footerTitle">CUSTOMER SERVICE</Heading>
                <Ul>
                  <FooterMenuLink to="/track-order" title="Track Order" />
                  <FooterMenuLink to="/return-policy" title="Returns" />
                  <FooterMenuLink to="/cancellation" title="Cancellation" />
                  <FooterMenuLink to="/faq" title="FAQ" />
                  <FooterMenuLink to="/privacy-policy" title="Privacy Policy" />
                  <FooterMenuLink to="/terms-and-conditions" title="Terms and Conditions" />
                </Ul>
              </Box>
              <Box>
                <Heading variant="footerTitle">ABOUT US</Heading>
                <Ul>
                  <FooterMenuLink to="/who-we-are" title="Who We Are" />
                  <Li>
                    <a href="https://www.praxisretail.in/careers.html" rel="noreferrer noopener" target="_blank">
                      <Text variant="footerLink">Careers</Text>
                    </a>
                  </Li>
                  <FooterMenuLink to="/contact-us" title="Contact Us" />
                </Ul>
              </Box>
            </Col>
            <Col width={[1, 2 / 3, 2 / 12]}>
              <Box mb={24}>
                <Heading variant="footerTitle">USEFUL LINKS</Heading>
                <Ul>
                  <Li>
                    <a href="/sitemap.html" rel="noreferrer noopener" target="_blank">
                      <Text variant="footerLink">Sitemap</Text>
                    </a>
                  </Li>
                  <FooterMenuLink to="/promotions" title="Promotions" />
                </Ul>
              </Box>
              <Box>
                <Heading variant="footerTitle">CATALOG</Heading>
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
                </Ul>
              </Box>
            </Col>
            <Col width={[1, 2 / 3, 3 / 12]}>
              <Box mb={24}>
                <Heading variant="footerTitle">CONTACT US</Heading>
                <Ul>
                  <Li>
                    <a href="tel:1800-210-0004" rel="noreferrer noopener" target="_blank">
                      <Text variant="footerLink">1800-210-0004</Text>
                    </a>
                  </Li>
                  <Li>
                    <a href="mailto:care@hometown.in" rel="noreferrer noopener" target="_blank">
                      <Text variant="footerLink">care@hometown.in</Text>
                    </a>
                  </Li>
                  <Li>
                    <Link to="/store-locator">
                      <Text variant="footerLink">Store Locator</Text>
                    </Link>
                  </Li>
                </Ul>
              </Box>
            </Col>
            <Col width={[1, 1, 5 / 12]}>
              {!already ? (
                <form onSubmit={this.handleSubmit}>
                  <Box col="9">
                    <FormInput
                      label=""
                      onChange={this.onChangeEmail}
                      value={email}
                      type="text"
                      placeholder=""
                      feedBackError={emailError}
                      feedBackMessage={emailErrorMessage}
                    />
                  </Box>
                  <Box col="3">
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
                  </Box>
                </form>
              ) : (
                <Text color="green" fontSize="0.955rem" mt="0" mb="0" lh="2" ta="left">
                  You have been successfully subscribed to the Newsletter
                </Text>
              )}
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
  subscribe: {}
};

Footer.propTypes = {
  sendFormData: PropTypes.func.isRequired,
  subscribe: PropTypes.object
};
export default connect(mapStateToProps, { sendFormData: sendData })(Footer);

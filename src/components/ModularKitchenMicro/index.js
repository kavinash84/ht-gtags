import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Theme from 'hometown-components/lib/Theme';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';
import StoresCarousel from 'components/Stores';
import { getCities } from 'selectors/homepage';
import { sendData, getData } from 'redux/modules/services';
import { smoothScroll } from 'utils/helper';
import Header from './Header';
import Footer from './Footer';
import SlickSlider from '../SlickSlider';
import ModularKitchenForm from './ModularKitchenForm';

const styles = require('./ModularKitchen.scss');

const sliderData = require('../../data/MKSlider.js');
const steps6Img = require('../../../static/share-an-enquiry.jpg');
const CloseIcon = require('../../../static/minus-round.svg');
const OpenIcon = require('../../../static/plus-round.svg');
const ProfessionalServicesIcon = require('../../../static/hand-shake.png');
const ISOIcon = require('../../../static/iso-icon.png');
const FiraIcon = require('../../../static/fira-icon.png');
const QualityIcon = require('../../../static/quality.png');
const Years10Icon = require('../../../static/years-icons.png');
const Years5Icon = require('../../../static/years-icons.png');
const Free6Icon = require('../../../static/free6-icon.png');
const grassIcon = require('../../../static/grass.png');
const hettichIcon = require('../../../static/hettich.png');
const kessebIcon = require('../../../static/kesseb.png');

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 1 : length,
  slidesToScroll: 1
});

@connect(
  ({ stores }) => ({
    cities: getCities(stores)
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
export default class ModularKitchen extends Component {
  render() {
    const { cities } = this.props;
    return (
      <Div display="block">
        <Header />
        <Section p="0" mb="0">
          <MainSlider data={sliderData} />
          <Container className={styles.mkWrapper}>
            <ModularKitchenForm />
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="1" />
              <Div col="10">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Duracucine - The world of stylish and durable kitchens
                </Heading>
                <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                  At Duracucine, we believe in turning your everyday activities like cooking and eating into a feast.
                  And that’s why we build bespoke kitchens for you. Whatever your requirements are for your favourite
                  space, we make it happen. Because we believe you just don’t cook in your kitchen, you create, you
                  indulge, you live.
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2rem">
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  Designs
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  Modules
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  Finishes
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  Accessories
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  Customers
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" bg="microBg">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="1" />
              <Div col="10">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Why Duracucine?
                </Heading>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2rem">
              <Div display="flexEqual">
                <Img src={ProfessionalServicesIcon} alt="Professional Services" width="auto" height="45px" m="auto" />
                <Text
                  fontSize="0.75rem"
                  color={Theme.colors.textLight}
                  textTransform="uppercase"
                  mt="0.625rem"
                  mb="0"
                  ta="center"
                >
                  Professional<br /> Services
                </Text>
              </Div>
              <Div display="flexEqual">
                <Img src={ISOIcon} alt="ISO 9001 Certified Factory" width="auto" height="45px" m="auto" />
                <Text
                  fontSize="0.75rem"
                  color={Theme.colors.textLight}
                  textTransform="uppercase"
                  mt="0.625rem"
                  mb="0"
                  ta="center"
                >
                  ISO 9001 <br /> Certified<br /> Factory
                </Text>
              </Div>
              <Div display="flexEqual">
                <Img src={FiraIcon} alt="FIRA certified" width="auto" height="45px" m="auto" />
                <Text
                  fontSize="0.75rem"
                  color={Theme.colors.textLight}
                  textTransform="uppercase"
                  mt="0.625rem"
                  mb="0"
                  ta="center"
                >
                  FIRA<br /> certified
                </Text>
              </Div>
              <Div display="flexEqual">
                <Img src={QualityIcon} alt="Quality Fittings" width="auto" height="45px" m="auto" />
                <Text
                  fontSize="0.75rem"
                  color={Theme.colors.textLight}
                  textTransform="uppercase"
                  mt="0.625rem"
                  mb="0"
                  ta="center"
                >
                  Quality<br /> Fittings
                </Text>
              </Div>
              <Div display="flexEqual">
                <Img src={Years10Icon} alt="10 years warranty Duratuf" width="auto" height="45px" m="auto" />
                <Text
                  fontSize="0.75rem"
                  color={Theme.colors.textLight}
                  textTransform="uppercase"
                  mt="0.625rem"
                  mb="0"
                  ta="center"
                >
                  10 years warranty<br /> Duratuf
                </Text>
              </Div>
              <Div display="flexEqual">
                <Img src={Years5Icon} alt="5 years warranty Kitchen Furniture" width="auto" height="45px" m="auto" />
                <Text
                  fontSize="0.75rem"
                  color={Theme.colors.textLight}
                  textTransform="uppercase"
                  mt="0.625rem"
                  mb="0"
                  ta="center"
                >
                  5 years warranty<br /> Kitchen<br /> Furniture
                </Text>
              </Div>
              <Div display="flexEqual">
                <Img src={Free6Icon} alt="6 Free Service Visits" width="auto" height="45px" m="auto" />
                <Text
                  fontSize="0.75rem"
                  color={Theme.colors.textLight}
                  textTransform="uppercase"
                  mt="0.625rem"
                  mb="0"
                  ta="center"
                >
                  6 Free<br /> Service Visits
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="1" />
              <Div col="10">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  6 easy steps to book your kitchen
                </Heading>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2rem" alignItems="center">
              <Div col="6">
                <Img src={steps6Img} alt="" width="100%" />
              </Div>
              <Div col="6" p="2rem" ta="left">
                <Heading ta="left" fontFamily="light" mt="0" mb="0" color="textDark">
                  Share an Inquiry
                </Heading>
                <Text color={Theme.colors.secondary} fontWeight="light" mt="0.3125rem" mb="0" ta="left" fontSize="1rem">
                  kitchen designs that are perfect for you— Contact us to know and order your dream kitchen
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" alignItems="center">
              <Div col="6" p="2rem" ta="right">
                <Heading ta="right" fontFamily="light" mt="0" mb="0" color="textDark">
                  Meet Our Design Experts
                </Heading>
                <Text
                  color={Theme.colors.secondary}
                  fontWeight="light"
                  mt="0.3125rem"
                  mb="0"
                  ta="right"
                  fontSize="1rem"
                >
                  your very own kitchen expert at a Homwtown near you, or a preview home, for a free consultation. Touch
                  and feel the brilliance in quality along with experiencing design.
                </Text>
              </Div>
              <Div col="6">
                <Img src={steps6Img} alt="" width="100%" />
              </Div>
            </Row>
            <Row ml="0" mr="0" alignItems="center">
              <Div col="6">
                <Img src={steps6Img} alt="" width="100%" />
              </Div>
              <Div col="6" p="2rem" ta="left">
                <Heading ta="left" fontFamily="light" mt="0" mb="0" color="textDark">
                  First Site measurement
                </Heading>
                <Text color={Theme.colors.secondary} fontWeight="light" mt="0.3125rem" mb="0" ta="left" fontSize="1rem">
                  your chosen design, guided by your very own dedicated expert designer — who understands everything
                  from your cooking style and lifestyle to visual preferences and budget
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" alignItems="center">
              <Div col="6" p="2rem" ta="right">
                <Heading ta="right" fontFamily="light" mt="0" mb="0" color="textDark">
                  Discuss your requirement
                </Heading>
                <Text
                  color={Theme.colors.secondary}
                  fontWeight="light"
                  mt="0.3125rem"
                  mb="0"
                  ta="right"
                  fontSize="1rem"
                >
                  Got the final quote and Book your personalized kitchen
                </Text>
              </Div>
              <Div col="6">
                <Img src={steps6Img} alt="" width="100%" />
              </Div>
            </Row>
            <Row ml="0" mr="0" alignItems="center">
              <Div col="6">
                <Img src={steps6Img} alt="" width="100%" />
              </Div>
              <Div col="6" p="2rem" ta="left">
                <Heading ta="left" fontFamily="light" mt="0" mb="0" color="textDark">
                  Book your order.
                </Heading>
                <Text color={Theme.colors.secondary} fontWeight="light" mt="0.3125rem" mb="0" ta="left" fontSize="1rem">
                  It’s time for you to pick up culinary skills in a new cuisine while we do all the hard work for you.
                  Your kitchen is delivered and installed by experts.
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" alignItems="center">
              <Div col="6" p="2rem" ta="right">
                <Heading ta="right" fontFamily="light" mt="0" mb="0" color="textDark">
                  Install the kitchen
                </Heading>
              </Div>
              <Div col="6">
                <Img src={steps6Img} alt="" width="100%" />
              </Div>
            </Row>
          </Container>
        </Section>
        <Section p="4rem 0" mb="0" bg="microBg">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="1" />
              <Div col="10" ta="center">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Why to wait, get started now!
                </Heading>
                <Text fontSize="0.875rem" mt="0.3125rem" mb="1rem" ta="center" color={Theme.colors.textExtraLight}>
                  At Duracucine, we believe in turning your everyday activities \like cooking and eating into a feast.
                  And that’s why we build bespoke kitchens for you. Whatever your requirements are for your favourite
                  space, we make it happen. Because we believe you just don’t cook in your kitchen, you create, you
                  indulge, you live.
                </Text>
                <Button
                  type="button"
                  btnType="custom"
                  p=".5rem 2rem"
                  bg={Theme.colors.mkPrimary}
                  color="white"
                  onClick={() => smoothScroll(12)}
                >
                  Book Now
                </Button>
              </Div>
            </Row>
          </Container>
        </Section>
        <Section p="4rem 0" mb="0">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="12" ta="center">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Why to wait, get started now!
                </Heading>
              </Div>
              <Div col="12">
                <Div className="collposeBlock">
                  <Heading
                    className="collopseHeading"
                    fontFamily="regular"
                    fontSize="1rem"
                    color="text"
                    lh="1.5"
                    ellipsis={false}
                  >
                    <button>
                      <Img className="close" src={CloseIcon} alt="Close" float="left" mr="0.625rem" />
                      <Img className="open" src={OpenIcon} alt="Open" float="left" mr="0.625rem" />
                      Can I pay in installments
                    </button>
                    <Text
                      className="collopseContent"
                      color="rgba(0,0,0,0.5)"
                      fontSize="0.875rem"
                      mb="1rem"
                      ml="2.125rem"
                    >
                      Lorem Ipsum
                    </Text>
                  </Heading>
                </Div>
                <Div className="collposeBlock">
                  <Heading
                    className="collopseHeading"
                    fontFamily="regular"
                    fontSize="1rem"
                    color="text"
                    lh="1.5"
                    ellipsis={false}
                  >
                    <button>
                      <Img className="close" src={CloseIcon} alt="Close" float="left" mr="0.625rem" />
                      <Img className="open" src={OpenIcon} alt="Open" float="left" mr="0.625rem" />
                      Can I pay in installments
                    </button>
                    <Text
                      className="collopseContent"
                      color="rgba(0,0,0,0.5)"
                      fontSize="0.875rem"
                      mb="1rem"
                      ml="2.125rem"
                    >
                      Lorem Ipsum
                    </Text>
                  </Heading>
                </Div>
                <Div className="collposeBlock">
                  <Heading
                    className="collopseHeading"
                    fontFamily="regular"
                    fontSize="1rem"
                    color="text"
                    lh="1.5"
                    ellipsis={false}
                  >
                    <button>
                      <Img className="close" src={CloseIcon} alt="Close" float="left" mr="0.625rem" />
                      <Img className="open" src={OpenIcon} alt="Open" float="left" mr="0.625rem" />
                      Can I pay in installments
                    </button>
                    <Text
                      className="collopseContent"
                      color="rgba(0,0,0,0.5)"
                      fontSize="0.875rem"
                      mb="1rem"
                      ml="2.125rem"
                    >
                      Lorem Ipsum
                    </Text>
                  </Heading>
                </Div>
                <Div className="collposeBlock">
                  <Heading
                    className="collopseHeading"
                    fontFamily="regular"
                    fontSize="1rem"
                    color="text"
                    lh="1.5"
                    ellipsis={false}
                  >
                    <button>
                      <Img className="close" src={CloseIcon} alt="Close" float="left" mr="0.625rem" />
                      <Img className="open" src={OpenIcon} alt="Open" float="left" mr="0.625rem" />
                      Can I pay in installments
                    </button>
                    <Text
                      className="collopseContent"
                      color="rgba(0,0,0,0.5)"
                      fontSize="0.875rem"
                      mb="1rem"
                      ml="2.125rem"
                    >
                      Lorem Ipsum
                    </Text>
                  </Heading>
                </Div>
                <Div className="collposeBlock">
                  <Heading
                    className="collopseHeading"
                    fontFamily="regular"
                    fontSize="1rem"
                    color="text"
                    lh="1.5"
                    ellipsis={false}
                  >
                    <button>
                      <Img className="close" src={CloseIcon} alt="Close" float="left" mr="0.625rem" />
                      <Img className="open" src={OpenIcon} alt="Open" float="left" mr="0.625rem" />
                      Can I pay in installments
                    </button>
                    <Text
                      className="collopseContent"
                      color="rgba(0,0,0,0.5)"
                      fontSize="0.875rem"
                      mb="1rem"
                      ml="2.125rem"
                    >
                      Lorem Ipsum
                    </Text>
                  </Heading>
                </Div>
              </Div>
            </Row>
          </Container>
        </Section>
        <Section p="4rem 0" mb="0" bg="microBg">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="12" ta="center" pb="1.25rem">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Testimonials by our customers
                </Heading>
              </Div>
              <Div col="12">
                <SlickSlider settings={adjustSlides(1)}>
                  <Div p="0 1rem">
                    <Text ta="center" fontSize="1rem" color="rgba(0,0,0,0.5)">
                      This is humble note of appreciation for<br />
                      the outstanding customer service provided by your<br />
                      Modular Kitchen Department at HomeTown.<br />
                      My special thanks to Ms. Priyanka & team for helping me<br />
                      in customising my kitchen as per my requirements and<br />
                      installing the same, well-within the committed time lines.<br />
                      I am elated with the service quality of your team.<br />
                      Keep the good work !
                    </Text>
                    <Heading ta="center" color="text" fontSize="1rem">
                      - Mr. Srikanth, Hydrabad
                    </Heading>
                  </Div>
                  <Div p="0 1rem">
                    <Text ta="center" fontSize="1rem" color="rgba(0,0,0,0.5)">
                      After spending few years in Australia,<br />
                      I was wondering whether I could get the same quality<br />
                      of Kitchens & Home Furniture in India. We were pleasantly<br />
                      surprised to see international quality furniture, kitchens<br />
                      & more at HomeTown. My wife & I were really amazed with<br />
                      how knowledgeable HomeTown’s Team was. They helped choose & build<br />
                      the perfect kitchen and wardrobes for us - steeply step.<br />
                      It feels great to have a living space that is tailor made<br />
                      for our lifestyle and preferences.
                    </Text>
                    <Heading ta="center" color="text" fontSize="1rem">
                      - Mr Rajendra Rao, Bangalore
                    </Heading>
                  </Div>

                  <Div p="0 1rem">
                    <Text ta="center" fontSize="1rem" color="rgba(0,0,0,0.5)">
                      I am extremely happy about my decision to come to HomeTown<br />
                      for renovating my kitchen. After having spent weeks trying<br />
                      to figure out designs & budget for my kitchen; it took just one<br />
                      visit to HomeTown to answer all my queries.<br />
                      You guys saved me a lot of trouble and time.<br />
                      Thank you for the wonderful kitchen.
                    </Text>
                    <Heading ta="center" color="text" fontSize="1rem">
                      - Mrs. Kiran Shah, Mumbai
                    </Heading>
                  </Div>

                  <Div p="0 1rem">
                    <Text ta="center" fontSize="1rem" color="rgba(0,0,0,0.5)">
                      Awesome work done by HomeTown team! <br />
                      I was particularly impressed with how real the 3D designs looked.<br />
                      It helped me take all the important decision even before starting the work.<br />
                      The execution quality was very good without compromising on aesthetics or speed.<br />
                      I keep getting complimented for my new kitchen & I never feel like leaving it at all.<br />
                      Thank you HomeTown!
                    </Text>
                    <Heading ta="center" color="text" fontSize="1rem">
                      - Mrs. Arpita Bhatnagar, Kolkata
                    </Heading>
                  </Div>
                </SlickSlider>
              </Div>
            </Row>
          </Container>
        </Section>
        <Section p="1.5rem 0" mb="0">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="1" />
              <Div col="10">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Our Partners
                </Heading>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2rem">
              <Div display="flexEqual">
                <Img src={hettichIcon} alt="" width="auto" height="80px" m="auto" />
              </Div>
              <Div display="flexEqual">
                <Img src={grassIcon} alt="" width="auto" height="80px" m="auto" />
              </Div>
              <Div display="flexEqual">
                <Img src={kessebIcon} alt="" width="auto" height="30px" mt="20px" m="auto" />
              </Div>
            </Row>
          </Container>
        </Section>
        <Section p="1.5rem 0" mb="0" bg="microBg">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0" mt="1rem" mb="2rem">
              <StoresCarousel cities={cities} />
            </Row>
          </Container>
        </Section>
        <Footer />
      </Div>
    );
  }
}

ModularKitchen.defaultProps = {
  cities: []
};
ModularKitchen.propTypes = {
  cities: PropTypes.array
};

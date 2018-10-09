import React, { Component } from 'react';
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
import FormInput from 'hometown-components/lib/Forms/FormInput';
import SlickSlider from '../SlickSlider';
import Header from './Header';

const adjustSlides = length => ({
  slidesToShow: length >= 3 ? 3 : length,
  slidesToScroll: 3
});

export default class ModularKitchen extends Component {
  render() {
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
    const huwilIcon = require('../../../static/huwil.png');
    const kessebIcon = require('../../../static/kesseb.png');

    return (
      <Div display="block">
        <Header />
        <Section p="0" mb="0">
          <MainSlider data={sliderData} />
          <Container className={styles.mkWrapper}>
            <Div className={styles.mkForm}>
              <form>
                <Row m="0 1rem">
                  <Div col="12" pr="0.625rem" pl="0.625rem">
                    <Heading mb="0.625rem" mt="0" color="mkFormHeading" fontSize="1.25rem" fontFamily="light">
                      Want to design your kitchen?
                    </Heading>
                  </Div>
                </Row>
                <Row m="0 1rem">
                  <Div col="6" pr="0.625rem" pl="0.625rem">
                    <FormInput label="Name" type="text" placeholder="" />
                  </Div>
                  <Div col="6" pr="0.625rem" pl="0.625rem">
                    <FormInput label="Phone" type="text" placeholder="" />
                  </Div>
                </Row>
                <Row m="0 1rem">
                  <Div col="6" pr="0.625rem" pl="0.625rem">
                    <FormInput label="Email" type="email" placeholder="" />
                  </Div>
                  <Div col="6" pr="0.625rem" pl="0.625rem">
                    <FormInput label="State" type="text" placeholder="" />
                  </Div>
                </Row>
                <Row m="0 1rem">
                  <Div col="6" pr="0.625rem" pl="0.625rem">
                    <FormInput label="City" type="text" placeholder="" />
                  </Div>
                  <Div col="6" pr="0.625rem" pl="0.625rem">
                    <Button
                      size="block"
                      btnType="custom"
                      color="#FFF"
                      bg="#dc4c3a"
                      bc="#dc4c3a"
                      fontFamily="regular"
                      height="38px"
                      mt="2rem"
                    >
                      {' '}
                      Submit{' '}
                    </Button>
                  </Div>
                </Row>
              </form>
            </Div>
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
            <Row ml="0" mr="0" mt="2rem">
              <Div col="12" ta="center">
                <Button type="button" btnType="custom" p=".5rem 2rem" bg={Theme.colors.mkPrimary} color="white">
                  Know More
                </Button>
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
                  Share an Enquiry
                </Heading>
                <Text color={Theme.colors.secondary} fontWeight="light" mt="0.3125rem" mb="0" ta="left" fontSize="1rem">
                  kitchen designs that are perfect for you— Contact us to know and order your dream kitchen
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" alignItems="center">
              <Div col="6" p="2rem" ta="right">
                <Heading ta="right" fontFamily="light" mt="0" mb="0" color="textDark">
                  Meet an Expert
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
                  Personalize the designs using 3D technology
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
                  Book your dream kitchen
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
                  See the designs come to life while we install your kitchen
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
                  Enjoy hassle free cooking<br />
                  as we take care of your kitchen<br />
                  with 6 free services
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
                  At Duracucine, we believe in turning your everyday activities like cooking and eating into a feast.
                  And that’s why we build bespoke kitchens for you. Whatever your requirements are for your favourite
                  space, we make it happen. Because we believe you just don’t cook in your kitchen, you create, you
                  indulge, you live.
                </Text>
                <Button type="button" btnType="custom" p=".5rem 2rem" bg={Theme.colors.mkPrimary} color="white">
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
                <SlickSlider settings={adjustSlides(3)}>
                  <Div p="0 1rem">
                    <Img
                      width="80px"
                      m="0 auto 0.625rem"
                      src="https://placeimg.com/80/80/people?t=1538054343339"
                      alt=""
                      color="textExtraLight"
                    />
                    <Text ta="center" fontSize="0.75rem" color="rgba(0,0,0,0.5)">
                      Right from the start, there has been amazing service. I would like to especially mention Aparna
                      for her design assistance and alternative solutions. She figured out exactly what we wanted even
                      though we didn’t
                    </Text>
                    <Heading ta="center" color="text" fontSize="1rem">
                      - NANDINI GUPTA
                    </Heading>
                  </Div>
                  <Div p="0 1rem">
                    <Img
                      width="80px"
                      m="0 auto 0.625rem"
                      src="https://placeimg.com/80/80/people?t=1538054343339"
                      alt=""
                      color="textExtraLight"
                    />
                    <Text ta="center" fontSize="0.75rem" color="rgba(0,0,0,0.5)">
                      Right from the start, there has been amazing service. I would like to especially mention Aparna
                      for her design assistance and alternative solutions. She figured out exactly what we wanted even
                      though we didn’t
                    </Text>
                    <Heading ta="center" color="text" fontSize="1rem">
                      - NANDINI GUPTA
                    </Heading>
                  </Div>
                  <Div p="0 1rem">
                    <Img
                      width="80px"
                      m="0 auto 0.625rem"
                      src="https://placeimg.com/80/80/people?t=1538054343339"
                      alt=""
                      color="textExtraLight"
                    />
                    <Text ta="center" fontSize="0.75rem" color="rgba(0,0,0,0.5)">
                      Right from the start, there has been amazing service. I would like to especially mention Aparna
                      for her design assistance and alternative solutions. She figured out exactly what we wanted even
                      though we didn’t
                    </Text>
                    <Heading ta="center" color="text" fontSize="1rem">
                      - NANDINI GUPTA
                    </Heading>
                  </Div>
                  <Div p="0 1rem">
                    <Img
                      width="80px"
                      m="0 auto 0.625rem"
                      src="https://placeimg.com/80/80/people?t=1538054343339"
                      alt=""
                      color="textExtraLight"
                    />
                    <Text ta="center" fontSize="0.75rem" color="rgba(0,0,0,0.5)">
                      Right from the start, there has been amazing service. I would like to especially mention Aparna
                      for her design assistance and alternative solutions. She figured out exactly what we wanted even
                      though we didn’t
                    </Text>
                    <Heading ta="center" color="text" fontSize="1rem">
                      - NANDINI GUPTA
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
                <Img src={hettichIcon} alt="" width="auto" height="50px" m="auto" />
              </Div>
              <Div display="flexEqual">
                <Img src={grassIcon} alt="" width="auto" height="50px" m="auto" />
              </Div>
              <Div display="flexEqual">
                <Img src={kessebIcon} alt="" width="auto" height="50px" m="auto" />
              </Div>
              <Div display="flexEqual">
                <Img src={huwilIcon} alt="" width="auto" height="50px" m="auto" />
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

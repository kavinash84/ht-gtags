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
// import ServiceSignUp from 'components/ServiceSignUp';

export default class ModularKitchen extends Component {
  render() {
    const sliderData = require('../../data/MKSlider.js');
    const steps6Img = require('../../../static/share-an-enquiry.jpg');

    return (
      <Div display="block">
        <Section p="0" mb="0">
          <MainSlider data={sliderData} />
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
        <Section p="2.5rem 0" mb="0">
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
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  Professional<br /> Services
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  ISO 9001 <br /> Certified<br /> Factory
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  FIRA<br /> certified
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  quality<br /> fittings
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  10 years<br /> warranty<br /> Duratuf
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  5 years<br /> warranty<br /> Kitchen Furniture
                </Text>
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
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
            <Row ml="0" mr="0" mt="2rem">
              <Div display="flexEqual">
                <Img src={steps6Img} alt="" />
              </Div>
              <Div display="flexEqual">
                <Heading ta="center" fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color={Theme.colors.textLight} textTransform="uppercase" mt="0.3125rem" mb="0" ta="center">
                  ISO 9001 <br /> Certified<br /> Factory
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

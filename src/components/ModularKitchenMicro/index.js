import React, { Component } from 'react';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
// import Img from 'hometown-components/lib/Img';
// import ServiceSignUp from 'components/ServiceSignUp';

export default class ModularKitchen extends Component {
  render() {
    const sliderData = require('../../data/MKSlider.js');

    return (
      <Div display="block">
        <Section p="0" mb="0">
          <MainSlider data={sliderData} />
        </Section>
        <Section pt="2rem">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div>
                <Heading mt="0" mb="0" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Duracucine - The world of stylish and durable kitchens
                </Heading>
                <Text fontSize="1rem" mt="0.3125rem" ta="center">
                  At Duracucine, we believe in turning your everyday activities like cooking and eating into a feast.
                  And that’s why we build bespoke kitchens for you. Whatever your requirements are for your favourite
                  space, we make it happen. Because we believe you just don’t cook in your kitchen, you create, you
                  indulge, you live.
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2rem">
              <Div display="flexEqual" ta="center">
                <Heading fontFamily="light" mt="0" mb="0" color="mkPrimary">
                  1000+
                </Heading>
                <Text color="textLight" mt="0.3125rem" mb="0" ta="center">
                  Designs
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}
import React, { Component } from 'react';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components-dev/lib/Section';
import Container from 'hometown-components-dev/lib/Container';
import Heading from 'hometown-components-dev/lib/Heading';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import Text from 'hometown-components-dev/lib/Text';
import Img from 'hometown-components-dev/lib/Img';
import ServiceSignUp from 'components/ServiceSignUp';

import { BASE_IMAGE_URL } from "helpers/Constants";

export default class ModularKitchen extends Component {
  render() {
    const sliderData = require('../../data/MKSlider.js');

    return (
      <div>
        <Section p="0" mb="0">
          <MainSlider data={sliderData} />
        </Section>
        <Section pt="2rem">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div>
                <Heading mt="0" mb="0" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  How it Works
                </Heading>
                <Text fontSize="1rem" mt="0.3125rem" ta="center">
                  Once you sign up with us
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2rem">
              <Div col="1" />
              <Div col="10">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-kitchen/20161209/book-our-services.jpg`}
                  alt=""
                  m="auto"
                />
              </Div>
            </Row>
            <ServiceSignUp formType="modular" />
            <Row ml="0" mr="0" pt="3.5rem">
              <Div>
                <Heading mt="0" mb="0" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Kitchens Made Easy For Every Indian Family
                </Heading>
                <Text fontSize="1rem" mt="0.3125rem" ta="center">
                  BEAUTIFUL KITCHEN DESIGNS
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2rem">
              <Div col="4" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/hometown-hp/2017/nov/20171129/modular-kitchen/moduler-1.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
              <Div col="4" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/hometown-hp/2017/nov/20171129/modular-kitchen/moduler-2.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
              <Div col="4" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/hometown-hp/2017/nov/20171129/modular-kitchen/moduler-3.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
            </Row>
            <Row ml="0" mr="0" pt="3.5rem">
              <Div>
                <Heading mt="0" mb="1rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  WHY HOMETOWN KITCHENS
                </Heading>
                <Text fontSize="1rem" mt="0.3125rem" ta="center" color="textLight">
                  Kitchen Delivery within 45 Days
                  <br />
                  Highest Quality Fitting And Accessories
                  <br />
                  100% Customized Designs Created Only For You
                  <br />
                  On Time, On Budget. Project Handover Gurantee
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="3rem">
              <Div col="3" />
              <Div col="2" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-kitchen/20161209/5-year-warranty.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
              <Div col="2" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-kitchen/20161209/free-service-visit.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
              <Div col="2" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-kitchen/20161209/emi-available.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
            </Row>
          </Container>
        </Section>
      </div>
    );
  }
}

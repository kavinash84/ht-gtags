import React, { Component } from 'react';
import MainSlider from 'components/MainSlider';
import ServiceSignUp from 'components/ServiceSignUp';
import Section from 'hometown-components-dev/lib/Section';
import Container from 'hometown-components-dev/lib/Container';
import Heading from 'hometown-components-dev/lib/Heading';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import Text from 'hometown-components-dev/lib/Text';
import Img from 'hometown-components-dev/lib/Img';

import { BASE_IMAGE_URL } from "helpers/Constants";

export default class ModularKitchen extends Component {
  render() {
    const sliderData = require('../../data/dandbSlider.js');
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
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-wardrobes/process.jpg`}
                  alt=""
                  m="auto"
                />
              </Div>
            </Row>
            <ServiceSignUp formType="dandb" />
            <Row ml="0" mr="0" pt="3.5rem">
              <Div>
                <Heading mt="0" mb="0" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Complete Design & Execution Solutions For Your Dream Home
                </Heading>
                <Text fontSize="1rem" mt="0.3125rem" ta="center">
                  BEAUTIFUL HOME DESIGNS
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2rem">
              <Div col="4" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-wardrobes/hassle-free-home-interior.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
              <Div col="4" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-wardrobes/sofa.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
              <Div col="4" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-wardrobes/room-wise-design.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
            </Row>
            <Row ml="0" mr="0" pt="3.5rem">
              <Div>
                <Heading mt="0" mb="1rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  WHY HOMETOWN
                </Heading>
                <Text fontSize="1rem" mt="0.3125rem" ta="center" color="textLight">
                  200+ Professional Interior Designers Over 4000 Happy Customers Across The <br />
                  Country 100% Customized Designs Created Only for You on Time,
                  <br />
                  On Budget, Project Handover Guarantee
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="3rem">
              <Div col="2" />
              <Div col="8" pl="0.625rem" pr="0.625rem">
                <Img
                  src={`${BASE_IMAGE_URL}/media/cms/Staticpage/modular-wardrobes/build-services.jpg`}
                  alt=""
                  width="100%"
                />
              </Div>
            </Row>
            <Row ml="0" mr="0" pt="3.5rem">
              <Div>
                <Heading mt="0" mb="1rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  OUR DESIGNS
                </Heading>
                <Row m="0">
                  <Div>
                    {/* eslint-disable */}
                    <Heading pb="2px" color="text" fontSize="0.875rem" mb="0.625rem">
                      HomeTown gives a perfect excuse to refurbish your living space
                    </Heading>
                    <Text fontSize="0.75rem" mb="1rem">
                      Interior designing is not just about making your interiors look beautiful but it also plays a
                      major role in functionality. A tiny apartment can also be transformed into a cozy residence with
                      enough space if having a good interior design.
                    </Text>

                    <Heading pb="2px" color="text" fontSize="0.875rem" mb="0.625rem">
                      Get home design services from HomeTown – A way to state of the art interiors
                    </Heading>
                    <Text fontSize="0.75rem" mb="1rem">
                      HomeTown, a one stop destination for all types of furniture, home décor and kitchenware shopping
                      also offers interior design services for home. It has a dedicated team of skilled and experienced
                      professional interior design consultants. The market is flooded with plethora of interior design
                      companies but the best thing about HomeTown is that it goes an extra mile to understand the needs
                      and preferences of the customers so that they can deliver the best to them. They believe in
                      creating an environment friendly, aesthetically pleasing and strikingly beautiful space by using
                      their professional skills. How to find to the best interior decorators near me? Does this question
                      bother you? Well, get in touch with HomeTown to avail affordable interior design services. Add a
                      unique sense of sophistication and elegance to your living space.
                    </Text>

                    <Heading pb="2px" color="text" fontSize="0.875rem" mb="0.625rem">
                      For best office interior designs – Reach out to HomeTown!
                    </Heading>
                    <Text fontSize="0.75rem" mb="1rem">
                      Gone are the days when office spaces meant boring work desks, mundane walls and elementary décor.
                      The latest trend needs to maintain a dynamic and cheerful environment to boost the morale and
                      productivity of employees. Apart from residential interior designing services, you can also reach
                      out to HomeTown for office interior designs. Regular looking offices are a pretty dated idea,
                      HomeTown believes in trying something different from regular designs. The basic idea includes
                      enough open spaces to welcome natural light and splashes of bright and vivacious colors to build a
                      creative, buoyant and energetic atmosphere.
                    </Text>
                  </Div>
                </Row>
              </Div>
            </Row>
          </Container>
        </Section>
      </div>
    );
  }
}

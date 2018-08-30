import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';
import { connect } from 'react-redux';

@connect(({ homepage: { banners } }) => ({
  banners: banners.data
}))
export default class ModularKitchen extends Component {
  render() {
    const { banners } = this.props;
    return (
      <div>
        <Section p="0" mb="0">
          <MainSlider data={banners} />
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
                <Img src="https://www.hometown.in/media/cms/Staticpage/modular-wardrobes/process.jpg" alt="" m="auto" />
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="2.5rem">
              <Div col="12" ta="center">
                <Button btnType="primary" pl="1rem" pr="2rem">
                  SIGN UP NOW
                </Button>
              </Div>
            </Row>
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
                  src="https://www.hometown.in/media/cms/Staticpage/modular-wardrobes/hassle-free-home-interior.jpg"
                  alt=""
                  width="100%"
                />
              </Div>
              <Div col="4" pl="0.625rem" pr="0.625rem">
                <Img
                  src="https://www.hometown.in/media/cms/Staticpage/modular-wardrobes/sofa.jpg"
                  alt=""
                  width="100%"
                />
              </Div>
              <Div col="4" pl="0.625rem" pr="0.625rem">
                <Img
                  src="https://www.hometown.in/media/cms/Staticpage/modular-wardrobes/room-wise-design.jpg"
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
                  Country 100% Customized Designs Created Only for You on Time,<br />
                  On Budget, Project Handover Guarantee
                </Text>
              </Div>
            </Row>
            <Row ml="0" mr="0" mt="3rem">
              <Div col="2" />
              <Div col="8" pl="0.625rem" pr="0.625rem">
                <Img
                  src="https://www.hometown.in/media/cms/Staticpage/modular-wardrobes/build-services.jpg"
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

ModularKitchen.defaultProps = {
  banners: []
};

ModularKitchen.propTypes = {
  banners: PropTypes.array
};

import React, { Component } from 'react';
import Container from 'hometown-components-dev/lib/Container';
import Section from 'hometown-components-dev/lib/Section';
import Div from 'hometown-components-dev/lib/Div';
import MenuFooter from 'containers/MenuFooter';
import SignupFormContainer from './SignupForm';

export default class Signup extends Component {
  render() {
    return (
      <Section p="0" mb="0">
        <MenuFooter pageTitle="Signup and get Rs.500 coupon">
          <div className="wrapper">
            <Container pr="0" pl="0">
              <Div p="3rem 0">
                <SignupFormContainer />
              </Div>
            </Container>
          </div>
        </MenuFooter>
      </Section>
    );
  }
}

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import SignupFormContainer from './SignupForm';

@withRouter
export default class Signup extends Component {
  render() {
    return (
      <Section p="0" mb="0">
        <Menu />
        <div className="wrapper">
          <Container pr="0" pl="0">
            <Div p="3rem 0">
              <SignupFormContainer />
            </Div>
          </Container>
        </div>
        <Footer />
      </Section>
    );
  }
}

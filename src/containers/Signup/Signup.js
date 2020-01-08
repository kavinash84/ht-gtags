import React, { Component } from 'react';

/* ====== Components ====== */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'newComponents/Footer';
import Header from 'newComponents/Header';
import SignupFormContainer from './SignupForm';

export default class Signup extends Component {
  render() {
    return (
      <Wrapper>
        <Body>
          {/* Header */}
          <Header />

          {/* Container */}
          <Container mt={80}>
            <SignupFormContainer />
          </Container>

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}

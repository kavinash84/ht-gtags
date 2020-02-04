import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'newComponents/Footer';
import Header from 'newComponents/Header';
import PaymentFailure from 'newComponents/PaymentFailure';

export default class PaymentFailureContainer extends Component {
  render() {
    const {
      match: {
        params: { orderId }
      }
    } = this.props;
    return (
      <Wrapper>
        <Body>
          {/* Header */}
          <Header />

          {/* Container */}
          <Container mt={60}>
            <PaymentFailure orderId={orderId} />
          </Container>

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}

PaymentFailureContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};

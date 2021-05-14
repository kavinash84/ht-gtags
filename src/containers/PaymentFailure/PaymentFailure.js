import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* ====== Components ====== */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import PaymentFailure from 'newComponents/PaymentFailure';
import BflPaymentFailure from 'newComponents/BflPaymentFailure';

class PaymentFailureContainer extends Component {
  render() {
    const {
      match: {
        params: { orderId }
      },
      emiPaymentType
    } = this.props;
    return (
      <Wrapper>
        <Body>
          {/* Header */}
          <Header />

          {/* Container */}
          <Container mt={60}>
            {emiPaymentType === 'bfl' ? <BflPaymentFailure /> : <PaymentFailure orderId={orderId} />}
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
  }).isRequired,
  emiPaymentType: PropTypes.string
};

PaymentFailureContainer.defaultProps = {
  emiPaymentType: ''
};

PaymentFailureContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = ({ app: { emiPaymentType } }) => ({
  emiPaymentType
});

export default connect(mapStateToProps, null)(PaymentFailureContainer);

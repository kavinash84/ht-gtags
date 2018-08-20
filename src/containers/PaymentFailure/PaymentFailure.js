import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentFailure from 'components/PaymentFailure';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class PaymentFailureContainer extends Component {
  render() {
    const { match: { params: { orderId } } } = this.props;
    return (
      <div>
        <Menu />
        <PaymentFailure orderId={orderId} />
        <Footer />
      </div>
    );
  }
}

PaymentFailureContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};

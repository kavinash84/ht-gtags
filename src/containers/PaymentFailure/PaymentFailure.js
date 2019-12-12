import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentFailure from 'components/PaymentFailure';
import MenuFooter from 'containers/MenuFooter';

export default class PaymentFailureContainer extends Component {
  render() {
    const {
      match: {
        params: { orderId }
      }
    } = this.props;
    return (
      <MenuFooter pageTitle="Payment Failed">
        <PaymentFailure orderId={orderId} />
      </MenuFooter>
    );
  }
}

PaymentFailureContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};

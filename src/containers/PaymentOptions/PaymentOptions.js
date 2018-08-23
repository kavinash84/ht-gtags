import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { load, setSelectedGatewayInSession } from 'redux/modules/paymentoptions';
import { getPaymentOptions } from 'selectors/payments';
import { getCartList } from 'selectors/cart';
import PaymentOptions from 'components/Checkout/PaymentOptions';

@withRouter
@connect(({ paymentoptions, cart }) => ({
  availableOptions: getPaymentOptions(paymentoptions),
  cart: getCartList(cart)
}))
@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    const { app: { sessionId } } = getState();
    await dispatch(load(sessionId));
    /* setting default paymentGateway in API */
    dispatch(setSelectedGatewayInSession('CreditCard', sessionId));
  }
})
export default class PaymentOptionsContainer extends Component {
  componentDidMount() {
    const { cart, history } = this.props;
    if (cart && cart.length) {
      history.push('/checkout/delivery-address');
    }
  }
  render() {
    const { availableOptions } = this.props;
    return (
      <div>
        <PaymentOptions data={availableOptions} />
      </div>
    );
  }
}

PaymentOptionsContainer.defaultProps = {
  availableOptions: {},
  cart: [],
  history: {}
};

PaymentOptionsContainer.propTypes = {
  availableOptions: PropTypes.object,
  history: PropTypes.object,
  cart: PropTypes.array
};

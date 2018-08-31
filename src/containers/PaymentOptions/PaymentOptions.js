import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { load, setSelectedGatewayInSession } from 'redux/modules/paymentoptions';
import { getPaymentOptions } from 'selectors/payments';
import { getCartList } from 'selectors/cart';
import Menu from 'components/MenuWithLogoOnly';
import Section from 'hometown-components/lib/Section';
import PaymentOptions from 'components/Checkout/PaymentOptions';

@withRouter
@connect(({ paymentoptions, cart }) => ({
  availableOptions: getPaymentOptions(paymentoptions),
  cart: getCartList(cart)
}))
@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { sessionId },
      cart
    } = getState();
    console.log(cart.data);
    if (cart && cart.length !== 0) {
      await dispatch(load(sessionId));
      /* setting default paymentGateway in API */
      dispatch(setSelectedGatewayInSession('CreditCard', sessionId));
    }
  }
})
export default class PaymentOptionsContainer extends Component {
  componentDidMount() {
    const { cart, history } = this.props;
    if (cart && cart.length === 0) {
      history.push('/cart');
    }
  }
  render() {
    const { availableOptions } = this.props;
    return (
      <Section p="0rem" mb="0">
        <div className="wrapper">
          <Menu />
          <PaymentOptions data={availableOptions} />
        </div>
      </Section>
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

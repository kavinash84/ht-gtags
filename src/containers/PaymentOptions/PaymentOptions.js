import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { load, setSelectedGatewayInSession } from 'redux/modules/paymentoptions';
import { getPaymentOptions } from 'selectors/payments';
import PaymentOptions from 'components/Checkout/PaymentOptions';

@connect(({ paymentoptions }) => ({
  availableOptions: getPaymentOptions(paymentoptions)
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
  availableOptions: {}
};

PaymentOptionsContainer.propTypes = {
  availableOptions: PropTypes.object
};

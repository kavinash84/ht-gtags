import React, { Component } from 'react';
import { provideHooks } from 'redial';
// import PropTypes from 'prop-types';
import { load as loadPaymentStatus, isLoaded } from 'redux/modules/paymentstatus';

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const { status } = params;
    console.log(status);
    if (!isLoaded(getState())) {
      dispatch(loadPaymentStatus(status));
    }
  }
})
class PaymentStatus extends Component {
  render() {
    return (
      <div>
        <p>Payment Status </p>
      </div>
    );
  }
}

export default PaymentStatus;

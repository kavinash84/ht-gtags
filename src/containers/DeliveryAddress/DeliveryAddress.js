import React, { Component } from 'react';
import { provideHooks } from 'redial';
import DeliveryAddressContainer from 'components/Checkout/DeliveryAddress';
import { loadMyAddress } from 'redux/modules/myaddress';

@provideHooks({
  defer: async ({ store: { dispatch } }) => {
    await dispatch(loadMyAddress());
  }
})
export default class DeliveryAddress extends Component {
  render() {
    return (
      <div>
        <DeliveryAddressContainer />
      </div>
    );
  }
}

import React, { Component } from 'react';
import { provideHooks } from 'redial';
import MyOrderContainer from 'components/MyOrder';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import { loadMyOrders } from 'redux/modules/orders';

@provideHooks({
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadMyOrders());
  }
})
export default class MyOrder extends Component {
  render() {
    return (
      <div>
        <Menu />
        <MyOrderContainer />
        <Footer />
      </div>
    );
  }
}

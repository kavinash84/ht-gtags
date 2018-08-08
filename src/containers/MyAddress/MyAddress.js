import React, { Component } from 'react';
import { provideHooks } from 'redial';
import MyAddressContainer from 'components/MyAddress';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import { loadMyAddress } from 'redux/modules/myaddress';

@provideHooks({
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadMyAddress());
  }
})
export default class MyOrder extends Component {
  render() {
    return (
      <div>
        <Menu />
        <MyAddressContainer />
        <Footer />
      </div>
    );
  }
}

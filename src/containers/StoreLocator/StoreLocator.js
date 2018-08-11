import React, { Component } from 'react';
import { provideHooks } from 'redial';
import StoreLocatorContainer from 'components/StoreLocator';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import { loadStoresData } from 'redux/modules/storelocator';

@provideHooks({
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadStoresData());
  }
})
export default class StoreLocator extends Component {
  render() {
    return (
      <div>
        <Menu />
        <StoreLocatorContainer />
        <Footer />
      </div>
    );
  }
}

import React, { Component } from 'react';
import { provideHooks } from 'redial';
// import { connect } from 'react-redux';
import StoreLocatorContainer from 'components/StoreLocator';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import { loadStoresData } from 'redux/modules/storelocator';

@provideHooks({
  defer: ({ store: { dispatch } }) => {
    dispatch(loadStoresData());
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

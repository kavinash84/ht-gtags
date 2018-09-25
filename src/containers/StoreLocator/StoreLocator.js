import React, { Component } from 'react';
import StoreLocatorContainer from 'components/StoreLocator';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

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

import React, { Component } from 'react';
import ModularKitchenContainer from 'components/StaticPages/ModularKitchen';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class ModularKitchen extends Component {
  render() {
    return (
      <div className="wrapper">
        <Menu />
        <ModularKitchenContainer />
        <Footer />
      </div>
    );
  }
}

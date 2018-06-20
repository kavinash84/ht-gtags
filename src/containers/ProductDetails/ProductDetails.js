import React, { Component } from 'react';
import ProductDetailsContainer from 'components/ProductDetails';
import Menu from 'containers/MenuNew/index';

export default class ProductDetails extends Component {
  render() {
    return (
      <div>
        <Menu />
        <ProductDetailsContainer />
      </div>
    );
  }
}

import React, { Component } from 'react';
import ProductDetailsContainer from 'components/ProductDetails';
import Menu from 'components/OtherMenu';

export default class ProductDetails extends Component {
  render() {
    // const styles = require('./Home.scss');

    return (
      <div>
        <Menu />
        <ProductDetailsContainer />
      </div>
    );
  }
}

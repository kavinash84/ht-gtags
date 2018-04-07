import React, { Component } from 'react';
import Product from 'hometown-components/lib/Product';
import ProductItems from '../../data/RecentlyViewedProducts.js';

export default class Listing extends Component {
  render() {
    // const styles = require('./Listing.scss');

    return <div>{ProductItems.map(item => <Product key={item.id} itemData={item} rating />)}</div>;
  }
}

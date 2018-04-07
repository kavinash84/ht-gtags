import React, { Component } from 'react';
import Product from 'hometown-components/lib/Product';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import ProductItems from '../../data/RecentlyViewedProducts.js';

export default class Listing extends Component {
  render() {
    // const styles = require('./Listing.scss');

    return (
      <Container>
        <Div>{ProductItems.map(item => <Product key={item.id} itemData={item} rating />)}</Div>
      </Container>
    );
  }
}

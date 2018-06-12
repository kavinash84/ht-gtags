import React, { Component } from 'react';
import WishlistContainer from 'components/Wishlist';
import Menu from 'containers/MenuNew/index';

export default class Wishlist extends Component {
  render() {
    // const styles = require('./Home.scss');

    return (
      <div>
        <Menu />
        <WishlistContainer />
      </div>
    );
  }
}

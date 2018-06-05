import React, { Component } from 'react';
import CartContainer from 'components/Cart';
import Menu from 'containers/MenuNew/index';
import TitleBar from 'components/TitleBar';

export default class Cart extends Component {
  render() {
    return (
      <div>
        <Menu />
        <TitleBar title="Shopping Cart" />
        <CartContainer />
      </div>
    );
  }
}

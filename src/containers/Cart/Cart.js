import React, { Component } from 'react';
import CartContainer from 'components/Cart';
import CartTotalContainer from 'components/CartTotal';
import Menu from 'components/OtherMenu';

export default class Cart extends Component {
  render() {
    return (
      <div>
        <Menu />
        <CartContainer />
        <CartTotalContainer />
      </div>
    );
  }
}

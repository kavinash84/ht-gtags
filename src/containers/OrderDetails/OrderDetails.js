import React, { Component } from 'react';
import OrderDetailsContainer from 'components/OrderDetails';
import Menu from 'components/OtherMenu';

export default class OrderDetails extends Component {
  render() {
    return (
      <div>
        <Menu />
        <OrderDetailsContainer />
      </div>
    );
  }
}

import React, { Component } from 'react';
import OrderSummaryContainer from 'components/OrderSummary';
import Menu from 'components/OtherMenu';

export default class OrderDetails extends Component {
  render() {
    return (
      <div>
        <Menu />
        <OrderSummaryContainer />
      </div>
    );
  }
}

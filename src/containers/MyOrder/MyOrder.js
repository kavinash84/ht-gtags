import React, { Component } from 'react';
import MyOrderContainer from 'components/MyOrder';
import Menu from 'components/Menu';

export default class MyOrder extends Component {
  render() {
    return (
      <div>
        <Menu />
        <MyOrderContainer />
      </div>
    );
  }
}

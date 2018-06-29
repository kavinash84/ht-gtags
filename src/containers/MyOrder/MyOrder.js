import React, { Component } from 'react';
import MyOrderContainer from 'components/MyOrder';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class MyOrder extends Component {
  render() {
    return (
      <div>
        <Menu />
        <MyOrderContainer />
        <Footer />
      </div>
    );
  }
}

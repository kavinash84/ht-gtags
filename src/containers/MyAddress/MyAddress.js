import React, { Component } from 'react';
import MyAddressContainer from 'components/MyAddress';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class MyOrder extends Component {
  render() {
    return (
      <div>
        <Menu />
        <MyAddressContainer />
        <Footer />
      </div>
    );
  }
}

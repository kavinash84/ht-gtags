import React, { Component } from 'react';
import PaymentFailureContainer from 'components/PaymentFailure';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class PaymentFailure extends Component {
  render() {
    return (
      <div>
        <Menu />
        <PaymentFailureContainer />
        <Footer />
      </div>
    );
  }
}

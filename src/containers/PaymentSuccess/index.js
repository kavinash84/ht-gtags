import React, { Component } from 'react';
import PaymentSuccessContainer from 'components/PaymentSuccess';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class PaymentSuccess extends Component {
  render() {
    return (
      <div>
        <Menu />
        <PaymentSuccessContainer />
        <Footer />
      </div>
    );
  }
}

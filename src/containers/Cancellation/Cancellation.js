import React, { Component } from 'react';
import CancellationContainer from 'components/StaticPages/Cancellation';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class Cancellation extends Component {
  render() {
    return (
      <div>
        <Menu />
        <CancellationContainer />
        <Footer />
      </div>
    );
  }
}

import React, { Component } from 'react';
import BulkOrderContainer from 'components/BulkOrder';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class BulkOrder extends Component {
  render() {
    return (
      <div>
        <Menu />
        <BulkOrderContainer />
        <Footer />
      </div>
    );
  }
}

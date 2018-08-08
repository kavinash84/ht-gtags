import React, { Component } from 'react';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import CorporateAddContainer from 'components/ContactUs/CorporateAdd';

export default class CorporateAdd extends Component {
  render() {
    return (
      <div>
        <Menu />
        <CorporateAddContainer />
        <Footer />
      </div>
    );
  }
}

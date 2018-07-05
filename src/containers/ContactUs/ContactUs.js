import React, { Component } from 'react';
import ContactUsContainer from 'components/StaticPages/ContactUs';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class ContactUs extends Component {
  render() {
    return (
      <div>
        <Menu />
        <ContactUsContainer />
        <Footer />
      </div>
    );
  }
}

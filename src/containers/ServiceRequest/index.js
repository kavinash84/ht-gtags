import React, { Component } from 'react';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import ServiceRequestContainer from 'components/ContactUs/ServiceRequest';

export default class ServiceRequest extends Component {
  render() {
    return (
      <div>
        <Menu />
        <ServiceRequestContainer />
        <Footer />
      </div>
    );
  }
}

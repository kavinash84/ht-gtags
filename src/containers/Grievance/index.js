import React, { Component } from 'react';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import GrievanceContainer from 'components/ContactUs/Grievance';

export default class Grievance extends Component {
  render() {
    return (
      <div>
        <Menu />
        <GrievanceContainer />
        <Footer />
      </div>
    );
  }
}

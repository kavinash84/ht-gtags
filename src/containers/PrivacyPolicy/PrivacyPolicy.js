import React, { Component } from 'react';
import PrivacyPolicyContainer from 'components/StaticPages/PrivacyPolicy';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <div>
        <Menu />
        <PrivacyPolicyContainer />
        <Footer />
      </div>
    );
  }
}

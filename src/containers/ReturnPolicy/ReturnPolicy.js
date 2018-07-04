import React, { Component } from 'react';
import ReturnPolicyContainer from 'components/StaticPages/ReturnPolicy';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class ReturnPolicy extends Component {
  render() {
    return (
      <div>
        <Menu />
        <ReturnPolicyContainer />
        <Footer />
      </div>
    );
  }
}

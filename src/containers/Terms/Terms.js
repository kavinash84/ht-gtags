import React, { Component } from 'react';
import TermsContainer from 'components/StaticPages/Terms';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class Terms extends Component {
  render() {
    return (
      <div>
        <Menu />
        <TermsContainer />
        <Footer />
      </div>
    );
  }
}

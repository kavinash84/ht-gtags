import React, { Component } from 'react';
import FaqContainer from 'components/StaticPages/FAQ';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class Faq extends Component {
  render() {
    return (
      <div>
        <Menu />
        <FaqContainer />
        <Footer />
      </div>
    );
  }
}

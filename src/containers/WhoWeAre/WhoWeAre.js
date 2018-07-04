import React, { Component } from 'react';
import WhoWeAreContainer from 'components/StaticPages/WhoWeAre';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class WhoWeAre extends Component {
  render() {
    return (
      <div>
        <Menu />
        <WhoWeAreContainer />
        <Footer />
      </div>
    );
  }
}

import React, { Component } from 'react';
import DesignBuildContainer from 'components/StaticPages/DesignBuild';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class DesignBuild extends Component {
  render() {
    return (
      <div className="wrapper">
        <Menu />
        <DesignBuildContainer />
        <Footer />
      </div>
    );
  }
}

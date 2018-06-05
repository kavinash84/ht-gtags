import React, { Component } from 'react';
import StoresContainer from 'components/Stores';
import Menu from 'containers/MenuNew/index';

export default class Stores extends Component {
  render() {
    return (
      <div>
        <Menu />
        <StoresContainer />
      </div>
    );
  }
}

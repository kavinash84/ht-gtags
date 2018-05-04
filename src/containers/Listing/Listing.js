import React, { Component } from 'react';
import ListingContainer from 'components/Listing';
import Menu from 'components/OtherMenu';

export default class Listing extends Component {
  render() {
    // const styles = require('./Home.scss');

    return (
      <div>
        <Menu filter search />
        <ListingContainer />
      </div>
    );
  }
}

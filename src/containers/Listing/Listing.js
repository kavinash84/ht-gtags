import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ListingContainer from 'components/Listing';
import Menu from 'components/OtherMenu';

@withRouter
export default class Listing extends Component {
  render() {
    return (
      <div>
        <Menu filter search />
        <ListingContainer />
      </div>
    );
  }
}

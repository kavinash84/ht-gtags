import React, { Component } from 'react';

export default class UnbxdRecentlyViewed extends Component {
  componentDidMount() {
    if (window.refreshWidgets) window.refreshWidgets();
  }

  render() {
    return (
      <React.Fragment>
        <div id="unbxd_recently_viewed" />
      </React.Fragment>
    );
  }
}

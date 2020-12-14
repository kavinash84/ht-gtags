import React, { Component } from 'react';

export default class UnbxdRecommendedForYou extends Component {
  componentDidMount() {
    if (window.refreshWidgets) window.refreshWidgets();
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div id="unbxd_recommended_for_you" />
        </div>
      </React.Fragment>
    );
  }
}

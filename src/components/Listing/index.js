import React, { Component } from 'react';

export default class Listing extends Component {
  render() {
    const styles = require('./Listing.scss');

    return <div className={styles.Listing}>Listing</div>;
  }
}

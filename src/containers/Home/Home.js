import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(state => ({
  online: state.online
}))
export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div>Home Page</div>
      </div>
    );
  }
}

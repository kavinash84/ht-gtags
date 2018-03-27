import React, { Component } from 'react';

export default class Hamburger extends Component {
  render() {
    const styles = require('./Hamburger.scss');

    return (
      <div className={styles.hamburger}>
        <div className={styles.barContainer}>
          <div className={styles.bar1} />
          <div className={styles.bar2} />
          <div className={styles.bar3} />
        </div>
      </div>
    );
  }
}

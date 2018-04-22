import React, { Component } from 'react';

export default class OtherMenu extends Component {
  render() {
    const styles = require('./OtherMenu.scss');

    return (
      <div className={styles.otherMenuContainer}>
        <div className="container">
          <div className={styles.back}>
            <a href="#back">
              <img src="http://via.placeholder.com/20x20" alt="" />
            </a>
          </div>
          <div className={styles.rightBLock}>
            <a href="#back">
              <img src="http://via.placeholder.com/20x20" alt="" />
            </a>
            <a href="#back">
              <img src="http://via.placeholder.com/20x20" alt="" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

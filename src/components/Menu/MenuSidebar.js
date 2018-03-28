import React, { Component } from 'react';

export default class MenuSidebar extends Component {
  state = {
    open: false
  };
  onClick = e => {
    e.preventDefault();
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };
  render() {
    const { open } = this.state;
    const styles = require('./MenuSidebar.scss');
    // const userImg = require('http://via.placeholder.com/60x60');
    // const closeIcon = require('http://via.placeholder.com/17x17');

    return (
      <div>
        <div className={styles.hamburger}>
          <div className={styles.barContainer}>
            <button className="noPadding" onClick={this.onClick}>
              <div className={styles.bar1} />
              <div className={styles.bar2} />
              <div className={styles.bar3} />
            </button>
          </div>
        </div>
        <div className={`${styles.sidebar} ${open ? styles.show : ''}`}>
          <div className={styles.sidebarContainer}>
            <div className={styles.sidebarUserDetails}>
              <img src="http://via.placeholder.com/60x60" alt="" />
              <p>Saurabh Suman</p>
              <div className={styles.closeIcon}>
                <button className="noPadding" onClick={this.onClick}>
                  <img src="http://via.placeholder.com/20x20" alt="" />
                </button>
              </div>
            </div>
            <div className={styles.sidebarProfileMenu}>
              <ul>
                <li>
                  <a href="#profInfo">
                    Profile Information <span>❯</span>
                  </a>
                </li>
                <li>
                  <a href="#myWishList">
                    My Wishlist <span>❯</span>
                  </a>
                </li>
                <li>
                  <a href="#UpdatePassword">
                    Update Password <span>❯</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

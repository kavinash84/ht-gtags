import React, { Component } from 'react';

export default class SideBar extends Component {
  render() {
    const styles = require('./SideBar.scss');
    // const userImg = require('http://via.placeholder.com/60x60');
    // const closeIcon = require('http://via.placeholder.com/17x17');

    return (
      <div className={`${styles.sidebar}`}>
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebarUserDetails}>
            <img src="http://via.placeholder.com/60x60" alt="" />
            <p>Saurabh Suman</p>
            <div className={styles.closeIcon}>
              <img src="http://via.placeholder.com/20x20" alt="" />
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
    );
  }
}

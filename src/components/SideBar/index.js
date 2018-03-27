import React, { Component } from 'react';

export default class SideBar extends Component {
  render() {
    const styles = require('./SideBar.scss');

    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebarUserDetails}>
            <img src="http://via.placeholder.com/60x60" alt="" />
            <p>Saurabh Suman</p>
          </div>
          <div className={styles.sidebarProfileMenu}>
            <ul>
              <li>
                <a href="#profInfo">Profile Information</a>
              </li>
              <li>
                <a href="#myWishList">My Wishlist</a>
              </li>
              <li>
                <a href="#UpdatePassword">Update Password</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

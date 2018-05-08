import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import { HOME_URL } from 'helpers/Constants';

const LogoutIcon = require('../../../static/logout.jpg');
const LogoIcon = require('../../../static/logo.png');
const CartIcon = require('../../../static/cart.jpg');

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

    return (
      <div>
        <div className={styles.hamburger}>
          <Div col="7">
            <div className={styles.barContainer}>
              <button className="noPadding" onClick={this.onClick}>
                <div className={styles.bar1} />
                <div className={styles.bar2} />
                <div className={styles.bar3} />
              </button>
            </div>
            <div className={styles.logoWrapper}>
              <Link to={HOME_URL}>
                <Img src={LogoIcon} alt="Hometown" />
              </Link>
            </div>
          </Div>
          <Div col="5" ta="right" pt="0.625rem">
            <Button p="0" className={styles.heartBtn}>
              <div className="heart-shape" />
            </Button>
            <Link className={styles.cart} to={HOME_URL}>
              <Img src={CartIcon} alt="Hometown" height="26px" />
            </Link>
          </Div>
        </div>
        <div className={`${styles.sidebar} ${open ? styles.show : ''}`}>
          <div className={styles.sidebarContainer}>
            <div className={styles.sidebarUserDetails}>
              <img className="userIcon" src="http://via.placeholder.com/60x60" alt="" />
              <p>Saurabh Suman</p>
              <div className={styles.closeIcon}>
                <button className="noPadding" onClick={this.onClick}>
                  <img src={LogoutIcon} alt="Logout" />
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

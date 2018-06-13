import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Span from 'hometown-components/lib/Span';
import { Label } from 'hometown-components/lib/Label';
import Fav from 'hometown-components/lib/Icons/Fav';
import Search from 'components/Search';
import ResponsiveModal from 'components/Modal';
import Pincode from 'components/Pincode';
import LoginModal from 'components/Login/LoginModal';
import { SIGNUP_URL, HOME_URL, LOGIN_URL, MY_WISHLIST_URL, MY_PROFILE_URL } from 'helpers/Constants';

const LogoIcon = require('../../../static/logo.png');
const CartIcon = require('../../../static/cart-icon.svg');
const MapIcon = require('../../../static/map-icon.svg');
const PhoneIcon = require('../../../static/phone-icon.svg');
const UserIcon = require('../../../static/user-icon.svg');

const onClick = history => e => {
  e.preventDefault();
  history.push(MY_WISHLIST_URL);
};

@withRouter
@connect(({ pincode, userLogin }) => ({
  selectedPincode: pincode.selectedPincode,
  isLoggedIn: userLogin.isLoggedIn
}))
export default class MenuSidebar extends Component {
  state = {
    openPincode: false,
    openLogin: false,
    userPopOver: false
  };
  onOpenPincodeModal = () => {
    this.setState({ openPincode: true });
  };
  onClosePincodeModal = () => {
    this.setState({ openPincode: false });
  };
  onOpenLoginModal = () => {
    this.setState({ openLogin: true });
  };
  onCloseLoginModal = () => {
    this.setState({ openLogin: false });
  };

  handleUserPopOver = () => {
    this.setState({
      userPopOver: !this.state.userPopOver
    });
  };

  render() {
    const styles = require('./TopBar.scss');
    const { userPopOver } = this.state;
    const { selectedPincode, isLoggedIn, history } = this.props;
    return (
      <div>
        <div className={styles.hamburger}>
          <Div col="2">
            <div className={styles.logoWrapper}>
              <Link to={HOME_URL}>
                <Img src={LogoIcon} alt="Hometown" />
              </Link>
            </div>
          </Div>
          <Div col="5">
            <Search />
          </Div>
          <Div col="5" ta="right" pt="0.3125rem">
            <button onClick={this.onOpenPincodeModal}>
              <Img src={MapIcon} alt="Hometown" height="24px" mr="0.625rem" float="left" />
              <Span fontSize="0.875rem">{selectedPincode !== '' ? selectedPincode : 'Pincode'}</Span>
            </button>
            <ResponsiveModal
              classNames={{ modal: styles.pincodeModal }}
              onCloseModal={this.onClosePincodeModal}
              open={this.state.openPincode}
            >
              <Pincode onCloseModal={this.onClosePincodeModal} />
            </ResponsiveModal>
            <Link className={styles.cart} to={HOME_URL}>
              <Img src={PhoneIcon} alt="Hometown" height="24px" mr="0.625rem" float="left" />
              <Span fontSize="0.875em">1800-210-0004</Span>
            </Link>
            <Button
              p="0"
              className={styles.heartBtn}
              ml="1.25rem"
              onClick={isLoggedIn ? onClick(history) : this.onOpenLoginModal}
            >
              <Fav />
              <span className={styles.count}>0</span>
            </Button>
            <ResponsiveModal
              classNames={{ modal: styles.loginModal }}
              onCloseModal={this.onCloseLoginModal}
              open={this.state.openLogin}
            >
              <LoginModal />
            </ResponsiveModal>
            <Link className={styles.cart} to={HOME_URL}>
              <Img src={CartIcon} alt="Hometown" height="24px" />
              <span className={styles.count}>0</span>
            </Link>
            <Button p="0" className={styles.heartBtn} ml="1.25rem" onClick={this.handleUserPopOver}>
              <Img src={UserIcon} alt="Account" height="24px" mr="0.625rem" float="left" />
            </Button>
            <div className={`${styles.yourAccount} ${userPopOver ? '' : styles.hide}`}>
              <Row display="block" mr="0" ml="0">
                <Div col="12">
                  <Label fontWeight="regular" fontSize="1rem" mb="0.75rem" mt="0" color="black">
                    Your Account
                  </Label>
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0">
                {!isLoggedIn && (
                  <div className={styles.yourAccountWrapper}>
                    <Div col="6" pr="5px">
                      <Link to={SIGNUP_URL}>Sign Up</Link>
                    </Div>
                    <Div col="6" pl="5px">
                      <Link to={LOGIN_URL}>Log In</Link>
                    </Div>
                  </div>
                )}
                {isLoggedIn && (
                  <div className={styles.yourAccountWrapper}>
                    <Div col="6" pr="5px">
                      <Link to={MY_PROFILE_URL}>Profile</Link>
                    </Div>
                    <Div col="6" pl="5px">
                      <Button to={LOGIN_URL}>Logout !</Button>
                    </Div>
                  </div>
                )}
              </Row>
            </div>
          </Div>
        </div>
      </div>
    );
  }
}

MenuSidebar.defaultProps = {
  selectedPincode: '',
  isLoggedIn: false,
  history: {}
};

MenuSidebar.propTypes = {
  selectedPincode: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object
};

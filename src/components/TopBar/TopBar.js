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
import Heading from 'hometown-components/lib/Heading';
import { Label } from 'hometown-components/lib/Label';
import Fav from 'hometown-components/lib/Icons/Fav';
import Search from 'components/Search';
import ResponsiveModal from 'components/Modal';
import Pincode from 'components/Pincode';
import LoginModal from 'components/Login/LoginModal';
import { SIGNUP_URL, HOME_URL, LOGIN_URL, MY_WISHLIST_URL, MY_PROFILE_URL, CART_URL } from 'helpers/Constants';
import { logout } from 'redux/modules/login';
import { getCartCount } from 'selectors/cart';
import { getWishListCount } from 'selectors/wishlist';

const LogoIcon = require('../../../static/logo.png');
const CartIcon = require('../../../static/cart-icon.svg');
const PinIcon = require('../../../static/map-icon.svg');
// const MapIcon = require('../../../static/map.svg');
const PhoneIcon = require('../../../static/phone-icon.svg');
const UserIcon = require('../../../static/user-icon.svg');
const PincodeModalIcon = require('../../../static/map-placeholder.svg');

const onClick = history => e => {
  e.preventDefault();
  history.push(MY_WISHLIST_URL);
};

const onClickLogout = (dispatcher, history) => e => {
  e.preventDefault();
  dispatcher();
  history.push(HOME_URL);
};

@withRouter
@connect(
  ({
    pincode, userLogin, wishlist, cart, router
  }) => ({
    selectedPincode: pincode.selectedPincode,
    isLoggedIn: userLogin.isLoggedIn,
    wishListCount: getWishListCount(wishlist),
    cartCount: getCartCount(cart),
    router
  }),
  { logoutUser: logout }
)
export default class MenuSidebar extends Component {
  state = {
    openPincode: false,
    openLogin: false,
    userPopOver: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
  }
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
  handleClick = URL => e => {
    e.preventDefault();
    const { history, router } = this.props;
    history.push(`${URL}/?redirect=${router.location.pathname}`);
  };
  render() {
    const styles = require('./TopBar.scss');
    const { userPopOver } = this.state;
    const {
      selectedPincode, isLoggedIn, history, wishListCount, cartCount, logoutUser
    } = this.props;
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
              <Img src={PinIcon} alt="Hometown" height="24px" mr="0.3125rem" float="left" />
              <Span fontSize="0.875rem">{selectedPincode !== '' ? selectedPincode : 'Pincode'}</Span>
            </button>
            <ResponsiveModal
              classNames={{ modal: styles.pincodeModal }}
              onCloseModal={this.onClosePincodeModal}
              open={this.state.openPincode}
            >
              <Div>
                <Img width="100px" m="auto" mb="1.5rem" src={PincodeModalIcon} alt="Pincode" />
                <Heading
                  ellipsis={false}
                  color="rgba(0.0.0.0.8)"
                  ta="center"
                  fontSize="1.375rem"
                  mb="1rem"
                  fontFamily="700"
                >
                  Please enter your Pincode to serve you better
                </Heading>
                <Pincode onCloseModal={this.onClosePincodeModal} />
              </Div>
            </ResponsiveModal>
            <a className={styles.cart} href="tel:18002100004">
              <Img src={PhoneIcon} alt="Hometown" height="24px" mr="0.3125rem" float="left" />
              <Span fontSize="0.875em">1800-210-0004</Span>
            </a>
            <Link className={styles.cart} to="/store-locator">
              <Img src={PinIcon} alt="Hometown" height="24px" mr="0.3125rem" float="left" />
              <Span fontSize="0.875em">Store Locator</Span>
            </Link>
            <Button
              p="0"
              className={styles.heartBtn}
              ml="0.625rem"
              onClick={isLoggedIn ? onClick(history) : this.onOpenLoginModal}
            >
              <Fav />
              <span className={styles.count}>{isLoggedIn ? wishListCount : 0}</span>
            </Button>
            <ResponsiveModal
              classNames={{ modal: styles.loginModal }}
              onCloseModal={this.onCloseLoginModal}
              open={this.state.openLogin}
            >
              <LoginModal />
            </ResponsiveModal>
            <Link className={styles.cart} to={CART_URL}>
              <Img src={CartIcon} alt="Hometown" height="24px" />
              <span className={styles.count}>{cartCount}</span>
            </Link>
            <Button p="0" className={styles.userBtn} ml="0.625rem">
              <Img src={UserIcon} alt="Account" height="24px" mr="0" float="left" />
            </Button>
            <div className={`${styles.yourAccount} ${userPopOver ? '' : styles.hide}`}>
              <Row display="block" mr="0" ml="0">
                <Div col="12">
                  <Label fontFamily="regular" fontSize="1rem" mb="0.75rem" mt="0" color="black">
                    {isLoggedIn ? 'Your Account' : 'My Account'}
                  </Label>
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0">
                {!isLoggedIn && (
                  <div className={styles.yourAccountWrapper}>
                    <Div col="6" pr="5px">
                      <Link to={SIGNUP_URL} onClick={this.handleClick(SIGNUP_URL)}>
                        Sign Up
                      </Link>
                    </Div>
                    <Div col="6" pl="5px">
                      <Link to={LOGIN_URL} onClick={this.handleClick(LOGIN_URL)}>
                        Log In
                      </Link>
                    </Div>
                  </div>
                )}
                {isLoggedIn && (
                  <div className={styles.yourAccountWrapper}>
                    <Div col="6" pr="5px">
                      <Link to={MY_PROFILE_URL}>Profile</Link>
                    </Div>
                    <Div col="6" pl="5px">
                      <Button onClick={onClickLogout(logoutUser, history)}>Logout !</Button>
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
  wishListCount: 0,
  cartCount: 0,
  isLoggedIn: false,
  history: {},
  router: {},
  logoutUser: () => {}
};

MenuSidebar.propTypes = {
  selectedPincode: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object,
  wishListCount: PropTypes.number,
  cartCount: PropTypes.number,
  logoutUser: PropTypes.func,
  router: PropTypes.object
};

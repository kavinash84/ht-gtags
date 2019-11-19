import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* ====== Modules ====== */
import { logout } from 'redux/modules/login';

/* ====== selectors ====== */
import { getCartCount } from 'selectors/cart';
import { getWishListCount } from 'selectors/wishlist';

/* ====== Helpers ====== */
import { SIGNUP_URL, HOME_URL, LOGIN_URL, MY_WISHLIST_URL, MY_PROFILE_URL, CART_URL } from 'helpers/Constants';
import { titleCase, checkRedirection } from 'utils/helper';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import ButtonHtV1 from 'hometown-components/lib/ButtonHtV1';
import ColHtV1 from 'hometown-components/lib/ColHtV1';
import Fav from 'hometown-components/lib/Icons/FavHtV1';
import HeadingHtV1 from 'hometown-components/lib/HeadingHtV1';
import ImageHtV1 from 'hometown-components/lib/ImageHtV1';
import LabelHtV1 from 'hometown-components/lib/LabelHtV1';
import RowHtV1 from 'hometown-components/lib/RowHtV1';

/* ====== Page Components ====== */
import Search from 'newComponents/Search';
import ResponsiveModal from 'newComponents/Modal';
import PinCode from 'newComponents/PinCode';
import LoginForm from 'newComponents/Login/LoginForm';
import SignupForm from 'newComponents/Signup/SignupForm';

const LogoIcon = require('../../../static/logo@2x.png');
const CartIcon = require('../../../static/cart-icon.svg');
const PinIcon = require('../../../static/map-icon.svg');
const UserIcon = require('../../../static/user-icon.svg');
const PincodeModalIcon = require('../../../static/map-placeholder.svg');

const onClick = history => e => {
  e.preventDefault();
  history.push(MY_WISHLIST_URL);
};

const onClickLogout = dispatcher => e => {
  e.preventDefault();
  dispatcher();
};

@withRouter
@connect(
  ({
    pincode, userLogin, wishlist, cart, router, profile
  }) => ({
    selectedPincode: pincode.selectedPincode,
    isLoggedIn: userLogin.isLoggedIn,
    name: profile.data.first_name,
    wishListCount: getWishListCount(wishlist),
    cartCount: getCartCount(cart),
    router,
    profile
  }),
  {
    logoutUser: logout
  }
)
export default class HeaderTop extends Component {
  state = {
    openPincode: false,
    openLogin: false,
    openSignup: false,
    userPopOver: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        // openLogin: false
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
  onOpenSignupModal = () => {
    this.setState({ openSignup: true });
  };
  onCloseSignupModal = () => {
    this.setState({ openSignup: false });
  };
  handleClick = URL => e => {
    e.preventDefault();
    const { history, router } = this.props;
    history.push(`${URL}/?redirect=${checkRedirection(router.location.pathname)}`);
  };
  handleUserPopOver = () => {
    setTimeout(() => this.setState({ userPopOver: false }), 300);
  };
  handleUserPopIn = () => {
    this.setState({ userPopOver: true });
  };

  render() {
    const { userPopOver } = this.state;
    const {
      selectedPincode, isLoggedIn, history, wishListCount, cartCount, logoutUser, name
    } = this.props;

    return (
      <BoxHtV1 my={15}>
        <RowHtV1 alignItems="center">
          <ColHtV1 variant="col-3">
            <Link to={HOME_URL}>
              <ImageHtV1 src={LogoIcon} alt="Hometown" />
            </Link>
          </ColHtV1>
          <ColHtV1 variant="col-5">
            <Search />
          </ColHtV1>
          <ColHtV1 variant="col-4" flexDirection="row">
            <ButtonHtV1 onClick={this.onOpenPincodeModal}>
              <ImageHtV1 src={PinIcon} alt="Hometown" height="24px" mr="0.3125rem" float="left" />
              {selectedPincode !== '' ? selectedPincode : 'Pincode'}
            </ButtonHtV1>
            <Link to="/store-locator">
              <ImageHtV1 src={PinIcon} alt="Hometown" height="24px" mr="0.3125rem" float="left" />
              Store Locator
            </Link>
            <ButtonHtV1 onClick={isLoggedIn ? onClick(history) : this.onOpenLoginModal}>
              <Fav />
              <span>{isLoggedIn ? wishListCount : 0}</span>
            </ButtonHtV1>
            <Link to={CART_URL}>
              <ImageHtV1 src={CartIcon} alt="Hometown" height="24px" />
              <span>{cartCount}</span>
            </Link>
            <ButtonHtV1
              onFocus={this.handleUserPopIn}
              onBlur={this.handleUserPopOver}
              onMouseOver={this.handleUserPopIn}
              onMouseOut={this.handleUserPopOver}
            >
              {isLoggedIn ? (
                `Hi ${titleCase(name)} `
              ) : (
                <ImageHtV1 src={UserIcon} alt="Account" height="24px" mr="0" float="left" />
              )}
            </ButtonHtV1>
            <div display={userPopOver ? 'block' : 'none'}>
              <RowHtV1 display="block" mr="0" ml="0">
                <ColHtV1 variant="col-12">
                  <LabelHtV1>{isLoggedIn ? 'Your Account' : 'My Account'}</LabelHtV1>
                </ColHtV1>
              </RowHtV1>
              <RowHtV1 display="block" mr="0" ml="0">
                {!isLoggedIn && (
                  <div>
                    <ColHtV1 variant="col-6">
                      <Link to={SIGNUP_URL} onClick={this.handleClick(SIGNUP_URL)}>
                        Sign Up
                      </Link>
                    </ColHtV1>
                    <ColHtV1 variant="col-6">
                      <Link to={LOGIN_URL} onClick={this.handleClick(LOGIN_URL)}>
                        Log In
                      </Link>
                    </ColHtV1>
                  </div>
                )}
                {isLoggedIn && (
                  <div>
                    <ColHtV1 variant="col-6">
                      <Link to={MY_PROFILE_URL}>Profile</Link>
                    </ColHtV1>
                    <ColHtV1 variant="col-6">
                      <ButtonHtV1 onClick={onClickLogout(logoutUser)}>Logout !</ButtonHtV1>
                    </ColHtV1>
                  </div>
                )}
              </RowHtV1>
            </div>
          </ColHtV1>
        </RowHtV1>

        {/* Pincode Modal */}
        <ResponsiveModal
          classNames={{ modal: 'pincodeModal' }}
          onCloseModal={this.onClosePincodeModal}
          open={this.state.openPincode}
        >
          <BoxHtV1>
            <ImageHtV1 width="100px" m="auto" mb="1.5rem" src={PincodeModalIcon} alt="Pincode" />
            <HeadingHtV1 fontSize="1.375rem" mb="1rem">
              Please enter your Pincode to serve you better
            </HeadingHtV1>
            <PinCode color="#f2f2f2" onCloseModal={this.onClosePincodeModal} />
          </BoxHtV1>
        </ResponsiveModal>

        {/* Login Modal */}
        <ResponsiveModal
          classNames={{ modal: 'loginModal' }}
          onCloseModal={this.onCloseLoginModal}
          open={this.state.openLogin}
        >
          <LoginForm />
        </ResponsiveModal>

        {/* Signup Modal */}
        <ResponsiveModal
          classNames={{ modal: 'signupModal' }}
          onCloseModal={this.onCloseSignupModal}
          open={this.state.openSignup}
        >
          <SignupForm />
        </ResponsiveModal>
      </BoxHtV1>
    );
  }
}

HeaderTop.defaultProps = {
  selectedPincode: '',
  wishListCount: 0,
  cartCount: 0,
  isLoggedIn: false,
  name: '',
  history: {},
  router: {},
  logoutUser: () => {}
};

HeaderTop.propTypes = {
  selectedPincode: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object,
  wishListCount: PropTypes.number,
  cartCount: PropTypes.number,
  logoutUser: PropTypes.func,
  router: PropTypes.object,
  name: PropTypes.string
};

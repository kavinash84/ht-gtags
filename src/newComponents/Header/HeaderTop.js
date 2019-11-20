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
import CartIcon from 'hometown-components/lib/Icons/CartHtV1';
import ColHtV1 from 'hometown-components/lib/ColHtV1';
import FlexHtV1 from 'hometown-components/lib/FlexHtV1';
import FavIcon from 'hometown-components/lib/Icons/FavHtV1';
import HeadingHtV1 from 'hometown-components/lib/HeadingHtV1';
import ImageHtV1 from 'hometown-components/lib/ImageHtV1';
import LabelHtV1 from 'hometown-components/lib/LabelHtV1';
import LocationIcon from 'hometown-components/lib/Icons/LocationHtV1';
import RowHtV1 from 'hometown-components/lib/RowHtV1';
import UserIcon from 'hometown-components/lib/Icons/UserHtV1';
import TextHtV1 from 'hometown-components/lib/TextHtV1';

/* ====== Page Components ====== */
import Search from 'newComponents/Search';
import ResponsiveModal from 'newComponents/Modal';
import PinCode from 'newComponents/PinCode';
import LoginForm from 'newComponents/Login/LoginForm';
import SignupForm from 'newComponents/Signup/SignupForm';

const LogoIcon = require('../../../static/logo@2x.png');
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
      <BoxHtV1>
        <RowHtV1 alignItems="center">
          <ColHtV1 variant="col-3">
            <Link to={HOME_URL}>
              <ImageHtV1 height={28} src={LogoIcon} alt="Hometown" />
            </Link>
          </ColHtV1>
          <ColHtV1 variant="col-4">
            <Search />
          </ColHtV1>
          <ColHtV1 variant="col-5" flexDirection="row" justifyContent="flex-end">
            <ButtonHtV1 variant="link" onClick={this.onOpenPincodeModal}>
              <FlexHtV1 variant="row.alignCenter">
                <LocationIcon />
                <TextHtV1 variant="headerLabel">{selectedPincode !== '' ? selectedPincode : 'Pincode'}</TextHtV1>
              </FlexHtV1>
            </ButtonHtV1>
            <Link to="/store-locator">
              <FlexHtV1 variant="row.alignCenter" ml={20}>
                <LocationIcon />
                <TextHtV1 variant="headerLabel">Store Locator</TextHtV1>
              </FlexHtV1>
            </Link>
            <ButtonHtV1 variant="link" ml={20} onClick={isLoggedIn ? onClick(history) : this.onOpenLoginModal}>
              <FlexHtV1 variant="row.alignCenter">
                <FavIcon />
                <TextHtV1 variant="headerLabel">{isLoggedIn ? wishListCount : 0}</TextHtV1>
              </FlexHtV1>
            </ButtonHtV1>
            <Link to={CART_URL}>
              <FlexHtV1 variant="row.alignCenter" ml={20}>
                <CartIcon />
                <TextHtV1 variant="headerLabel">{cartCount}</TextHtV1>
              </FlexHtV1>
            </Link>
            <ButtonHtV1
              variant="link"
              onFocus={this.handleUserPopIn}
              onBlur={this.handleUserPopOver}
              onMouseOver={this.handleUserPopIn}
              onMouseOut={this.handleUserPopOver}
              ml={20}
            >
              {isLoggedIn ? <TextHtV1 variant="headerLabel">Hi ${titleCase(name)}</TextHtV1> : <UserIcon />}
            </ButtonHtV1>
            <BoxHtV1 display={userPopOver ? 'block' : 'none'}>
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
            </BoxHtV1>
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

import React, { Component, Fragment } from 'react';
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
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import CartIcon from 'hometown-components-dev/lib/Icons/CartHtV1';
import Card from 'hometown-components-dev/lib/CardHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import FavIcon from 'hometown-components-dev/lib/Icons/FavHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
// import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import LocationIcon from 'hometown-components-dev/lib/Icons/LocationHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import UserIcon from 'hometown-components-dev/lib/Icons/UserHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

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
    openSignup: false
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

  render() {
    const {
 selectedPincode, isLoggedIn, history, wishListCount, cartCount, logoutUser, name
} = this.props;

    return (
      <Box>
        <Row alignItems="center" marginRight={['0', '0 ', '-16px']} marginLeft={['0', '0 ', '-16px']}>
          <Col width={3 / 12}>
            <Link to={HOME_URL}>
              <Image height={28} src={LogoIcon} alt="Hometown" HtV1 />
            </Link>
          </Col>
          <Col width={4 / 12}>
            <Search />
          </Col>
          <Col width={5 / 12} flexDirection="row" justifyContent="flex-end">
            <Button variant="link" onClick={this.onOpenPincodeModal}>
              <Flex alignItems="center">
                <LocationIcon />
                <Text variant="headerLabel">{selectedPincode !== '' ? selectedPincode : 'Pincode'}</Text>
              </Flex>
            </Button>
            <Link to="/store-locator">
              <Flex alignItems="center" pl={20}>
                <LocationIcon />
                <Text variant="headerLabel">Store Locator</Text>
              </Flex>
            </Link>
            <Button
              variant="link"
              pl={20}
              sx={{
                '& ~ div': {
                  display: 'none',
                  '&:hover': {
                    display: 'block'
                  }
                },
                '&:hover': {
                  '& ~ div': {
                    display: 'block'
                  }
                }
              }}
            >
              {isLoggedIn ? <Text variant="headerLabel">Hi ${titleCase(name)}</Text> : <UserIcon />}
            </Button>
            <Box pt={20} sx={{ position: 'relative' }}>
              <Card variant="card.profileMore">
                {!isLoggedIn && (
                  <Fragment>
                    <Button as={Link} to={SIGNUP_URL} onClick={this.handleClick(SIGNUP_URL)} mb={15} width={175}>
                      Sign Up
                    </Button>
                    <Text mb={6} textAlign="center">
                      Not a member yet?
                    </Text>
                    <Button
                      as={Link}
                      variant="outline.primary"
                      to={LOGIN_URL}
                      onClick={this.handleClick(LOGIN_URL)}
                      width={175}
                      sx={{ display: 'block' }}
                    >
                      Log In
                    </Button>
                  </Fragment>
                )}
                {isLoggedIn && (
                  <Fragment>
                    <Button as={Link} to={MY_PROFILE_URL} mb={15} width={175}>
                      Profile
                    </Button>
                    <Button
                      variant="outline.primary"
                      onClick={onClickLogout(logoutUser)}
                      width={175}
                      sx={{ display: 'block' }}
                    >
                      Logout !
                    </Button>
                  </Fragment>
                )}
              </Card>
            </Box>
            <Button variant="link" pl={20} onClick={isLoggedIn ? onClick(history) : this.onOpenLoginModal}>
              <Flex alignItems="center">
                <FavIcon />
                <Text variant="headerLabel">{isLoggedIn ? wishListCount : 0}</Text>
              </Flex>
            </Button>
            <Flex as={Link} to={CART_URL} alignItems="center" pl={20}>
              <CartIcon />
              <Text variant="headerLabel">{cartCount}</Text>
            </Flex>
          </Col>
        </Row>

        {/* Pincode Modal */}
        <ResponsiveModal
          classNames={{ modal: 'pincodeModal' }}
          onCloseModal={this.onClosePincodeModal}
          open={this.state.openPincode}
        >
          <Box textAlign="center">
            <Image width="100px" m="auto" mb="1.5rem" src={PincodeModalIcon} alt="Pincode" />
            <Heading fontSize={20} lineHeight={1.3} mb="1rem">
              Please enter your Pincode to serve you better
            </Heading>
            <PinCode color="#f2f2f2" onCloseModal={this.onClosePincodeModal} />
          </Box>
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
      </Box>
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

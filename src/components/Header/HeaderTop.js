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
import {
  SIGNUP_URL,
  HOME_URL,
  LOGIN_URL,
  MY_WISHLIST_URL,
  MY_PROFILE_URL,
  CART_URL,
  DELIVERY_ADDRESS_URL
} from 'helpers/Constants';
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
import LocationIcon from 'hometown-components-dev/lib/Icons/LocationHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import UserIcon from 'hometown-components-dev/lib/Icons/UserHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/* ====== Page Components ====== */
import Search from 'components/Search';
import ResponsiveModal from 'components/Modal';
import PinCode from 'components/PinCode';
import LoginForm from 'components/LoginForms';
import SignupForm from 'components/Signup/SignupForm';
import ProductSummaryList from 'components/Checkout/ProductSummaryList';

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
 userLogin, wishlist, cart, router, profile
}) => ({
    isLoggedIn: userLogin.isLoggedIn,
    name: profile.data.first_name,
    wishListCount: getWishListCount(wishlist),
    cartCount: getCartCount(cart),
    router,
    profile,
    // cart,
    cartItems: cart.data,
    cartSummary: cart.summary,
    wishlist
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
  componentDidMount() {
    const { cart } = this.props;
    console.log('cart check', cart);
    const { wishlist } = this.props;
    console.log('wishlist check', wishlist);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
    const { wishlist } = this.props;
    console.log('wishlist check', wishlist);
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
      isLoggedIn,
      history,
      wishListCount,
      cartCount,
      logoutUser,
      name,
      // cart,
      cartItems,
      cartSummary,
      wishlist
    } = this.props;

    return (
      <Box>
        <Row sx={{ alignItems: 'center' }} mx={[0, 0, 0, -16]}>
          <Col width={3 / 12}>
            <Link to={HOME_URL}>
              <Image height={['auto', 'auto', 28]} src={LogoIcon} alt="Hometown" />
            </Link>
          </Col>
          <Col width={5.5 / 12}>
            <Search />
          </Col>
          <Col width={3.5 / 12} flexDirection="row" justifyContent="flex-end">
            {/* <Button variant="link" onClick={this.onOpenPincodeModal}>
              <Flex alignItems="center">
                <LocationIcon />
                <Text variant="headerLabel">{selectedPincode !== '' ? selectedPincode : 'Pincode'}</Text>
              </Flex>
            </Button> */}
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
                '+ div': {
                  display: 'none',
                  '&:hover': {
                    display: 'block'
                  }
                },
                ':hover': {
                  '& + div': {
                    display: 'block'
                  }
                }
              }}
            >
              {isLoggedIn ? <Text variant="headerLabel">Hi {titleCase(name)}</Text> : <UserIcon />}
            </Button>
            <Box pt={20} sx={{ position: 'relative' }}>
              <Card variant="card.profileMore">
                <Box variant="card.profileMoreWrapper">
                  {!isLoggedIn && (
                    <Fragment>
                      <Button
                        as={Link}
                        to={SIGNUP_URL}
                        onClick={this.handleClick(SIGNUP_URL)}
                        mb={15}
                        width={175}
                        lineHeight={1.25}
                      >
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
                </Box>
              </Card>
            </Box>
            <Button
              variant="link"
              pl={20}
              onClick={isLoggedIn ? onClick(history) : this.onOpenLoginModal}
              sx={{
                '+ div': {
                  display: 'none',
                  '&:hover': {
                    display: 'block'
                  }
                },
                ':hover': {
                  '& + div': {
                    display: 'block'
                  }
                }
              }}
            >
              <Flex alignItems="center">
                <FavIcon />
                <Text variant="headerLabel" ml={5}>
                  {isLoggedIn ? wishListCount : 0}
                </Text>
              </Flex>
            </Button>
            <Box pt={20} className="cart-popover" sx={{ position: 'relative' }}>
              <Card variant="card.profileMore" width={244}>
                <Box variant="card.profileMoreWrapper" px={15} py={15}>
                  {wishlist && wishlist.data.length > 0 && (
                    <Flex mx={-5} my={-5} sx={{ flexWrap: 'wrap' }}>
                      {wishlist.data.map(item => (
                        <Box px={5} py={5}>
                          <Image
                            src={`${item.product_info.images[0].url}.jpg`}
                            alt=""
                            width={64}
                            height={64}
                            sx={{ border: 'secondary' }}
                          />
                        </Box>
                      ))}
                      {/* <Box px={5} py={5}>
                      <Image
                        src={`${wishlist.data[0].product_info.images[0].url}.jpg`}
                        alt=""
                        width={64}
                        height={64}
                        sx={{ border: 'secondary' }}
                      />
                    </Box>
                    <Box px={5} py={5}>
                      <Image
                        src="https://www.hometown.in/media/product/53/1253/12483/1-top_sel_160.jpg"
                        alt=""
                        width={64}
                        height={64}
                      />
                    </Box> */}
                    </Flex>
                  )}
                  {/* <Flex mx={-5} my={-5} sx={{ flexWrap: 'wrap' }}>
                    <Box px={5} py={5}>
                      <Image
                        src="https://www.hometown.in/media/product/53/1253/12483/1-top_sel_160.jpg"
                        alt=""
                        width={64}
                        height={64}
                        sx={{ border: 'secondary' }}
                      />
                    </Box>
                    <Box px={5} py={5}>
                      <Image
                        src="https://www.hometown.in/media/product/53/1253/12483/1-top_sel_160.jpg"
                        alt=""
                        width={64}
                        height={64}
                      />
                    </Box>
                  </Flex> */}
                  <Box mt={10} mb={10}>
                    <Text sx={{ fontSize: 14 }}>Already have a list?</Text>
                  </Box>
                  <Flex mx={-5}>
                    <Box width={1 / 2} px={5}>
                      {!isLoggedIn && (
                        <Button as={Link} to={LOGIN_URL} width={1}>
                          SIGN IN
                        </Button>
                      )}
                    </Box>
                    <Box width={1 / 2} px={5}>
                      <Button as={Link} to={MY_WISHLIST_URL} variant="outline.primary" width={1}>
                        VIEW ALL
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </Card>
            </Box>
            <Flex
              as={Link}
              to={CART_URL}
              pl={20}
              alignItems="center"
              sx={{
                '+ div': {
                  display: 'none',
                  '&:hover': {
                    display: 'block'
                  }
                },
                ':hover': {
                  '& + div': {
                    display: 'block'
                  }
                }
              }}
            >
              <CartIcon />
              <Text variant="headerLabel" ml={5}>
                {cartCount}
              </Text>
            </Flex>
            <Box pt={20} className="cart-popover" sx={{ position: 'relative' }}>
              <Card variant="card.profileMore">
                <Box bg="bgOffer" px={20} py={8} sx={{ fontSize: 16, color: 'white' }}>
                  {cartCount} items in your cart
                </Box>
                <Box variant="card.profileMoreWrapper" px={0}>
                  <Box
                    mb={10}
                    mx={15}
                    width={300}
                    sx={{
                      borderBottom: 'divider'
                    }}
                  >
                    {/* <ProductSummaryList
                      qty={2}
                      productItem={{
                        image: 'https://www.hometown.in/media/product/53/1253/12483/1-top_sel_160.jpg',
                        unit_price: 2000,
                        special_price: 2000,
                        name: 'Logan Fabric Two Sea..',
                        color: 'brown'
                      }}
                    />
                    <ProductSummaryList
                      qty={2}
                      productItem={{
                        image: 'https://www.hometown.in/media/product/53/1253/12483/1-top_sel_160.jpg',
                        unit_price: 2000,
                        special_price: 2000,
                        name: 'Logan Fabric Two Sea..',
                        color: 'brown'
                      }}
                    /> */}
                    {cartItems.map(item => (
                      <ProductSummaryList
                        qty={item.qty}
                        productItem={{
                          image: `${item.product_info.image}`,
                          unit_price: `${item.product_info.unit_price}`,
                          special_price: `${item.product_info.net_price}`,
                          name: `${item.product_info.name}`,
                          color: `${item.product_info.color}`
                        }}
                      />
                    ))}
                  </Box>
                  <Box variant="col-12" pb={20} px={[0, 0, 16]}>
                    <Flex justifyContent="space-between">
                      <Text>Subtotal</Text>
                      <Text>Rs. {cartSummary.total}</Text>
                    </Flex>
                  </Box>
                  <Box px={16}>
                    <Button width={1} as={Link} to={DELIVERY_ADDRESS_URL} mb={10}>
                      CHECKOUT NOW
                    </Button>
                    <Button width={1} as={Link} to={CART_URL} variant="outline.primary">
                      VIEW CART
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
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
  wishListCount: 0,
  cartCount: 0,
  isLoggedIn: false,
  name: '',
  history: {},
  router: {},
  cartItems: [],
  cartSummary: {},
  cart: {},
  wishlist: {},
  logoutUser: () => {}
};

HeaderTop.propTypes = {
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object,
  wishListCount: PropTypes.number,
  cartCount: PropTypes.number,
  logoutUser: PropTypes.func,
  router: PropTypes.object,
  name: PropTypes.string,
  cartItems: PropTypes.array,
  cartSummary: PropTypes.object,
  cart: PropTypes.object,
  wishlist: PropTypes.object
};

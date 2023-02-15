import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

/* ====== Modules ====== */
import { logout } from "redux/modules/login";
import { checkCart, loadCart } from "redux/modules/cart";
// import { loadCart } from 'redux/modules/cart';
import { addToSelectForDemo } from "redux/modules/selectForDemo";

/* ====== selectors ====== */
import { getCartCount } from "selectors/cart";
import { getWishListCount } from "selectors/wishlist";

/* ====== Helpers ====== */
import {
  SIGNUP_URL,
  HOME_URL,
  LOGIN_URL,
  MY_WISHLIST_URL,
  MY_PROFILE_URL,
  CART_URL,
  DELIVERY_ADDRESS_URL,
  PINCODE
} from "helpers/Constants";
// import { PINCODE } from 'helpers/Constants';
import { titleCase, checkRedirection } from "utils/helper";
// import { formatAmount } from 'utils/formatters';

/* ====== Components ====== */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import CartIcon from "hometown-components-dev/lib/Icons/CartHtV1";
import Card from "hometown-components-dev/lib/CardHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import FavIcon from "hometown-components-dev/lib/Icons/FavHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import LocationIcon from "hometown-components-dev/lib/Icons/LocationHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import UserIcon from "hometown-components-dev/lib/Icons/UserHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

/* ====== Page Components ====== */
import Search from "components/Search";
import ResponsiveModal from "components/Modal";
import PinCode from "components/PinCode";
import LoginForm from "components/LoginForms";
import SignupForm from "components/Signup/SignupForm";
import ProductSummaryList from "components/Checkout/ProductSummaryList";

const LogoIcon = require("../../../static/new-logo.png");
const PincodeModalIcon = require("../../../static/map-placeholder.svg");

const onClick = history => e => {
  e.preventDefault();
  history.push(MY_WISHLIST_URL);
};

const onClickLogout = dispatcher => e => {
  e.preventDefault();
  dispatcher();
};

const despatchClearSelectForDemo = dispatcheroEmpty => {
  const state = [];
  dispatcheroEmpty(state);
};

@withRouter
@connect(
  ({ userLogin, wishlist, cart, router, profile, app, pincode }) => ({
    isLoggedIn: userLogin.isLoggedIn,
    name: profile.data.first_name,
    wishListCount: getWishListCount(wishlist),
    cartCount: getCartCount(cart),
    router,
    profile,
    // cart,
    cartItems: cart.data,
    cartSummary: cart.summary,
    wishlist,
    addToSelectForDemo,
    sessionId: app.sessionId,
    // pincode: { selectedPincode },
    selectedPincode: pincode.selectedPincode
  }),
  {
    logoutUser: logout,
    checkCart,
    loadCart,
    addToSelectForDemo
  }
)
export default class HeaderTop extends Component {
  state = {
    openPincode: false,
    openLogin: false,
    openSignup: false,
    containsOutOfStock: false
  };
  componentDidMount() {
    const { cartItems, sessionId } = this.props;
    this.containsOutOfStockFunc(cartItems);
    const { selectedPincode } = this.props;
    const pincode = selectedPincode === "" ? PINCODE : selectedPincode;
    this.props.loadCart(sessionId, pincode).catch(error => console.log(error));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
    // const { cartItems } = this.props;
    this.containsOutOfStockFunc(nextProps.cartItems);
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
    history.push(
      `${URL}/?redirect=${checkRedirection(router.location.pathname)}`
    );
  };

  checkCartBeforeCheckout = (dispatcher, session) => dispatcheroEmpty => {
    // e.preventDefault();
    const { selectedPincode } = this.props;
    const pincode = selectedPincode === "" ? PINCODE : selectedPincode;
    this.props.loadCart(session, pincode).catch(error => console.log(error));
    dispatcher(session);
    despatchClearSelectForDemo(dispatcheroEmpty); // New
  };

  containsOutOfStockFunc = items => {
    items.forEach(item => {
      if (item.product_info.stock === 0) {
        this.setState({
          containsOutOfStock: true
        });
      }
    });
  };

  formatAmount = amount => {
    if (amount) {
      const amt = amount.toString();
      const newAmt = Math.floor(amt).toString();
      const lastThree = newAmt.substring(newAmt.length - 3);
      const otherNumbers = newAmt.substring(0, newAmt.length - 3);
      const newlastThree = otherNumbers !== "" ? `,${lastThree}` : lastThree;
      const res =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + newlastThree;
      return res;
    }
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
      wishlist,
      // checkCart,
      sessionId
      // addToSelectForDemo
    } = this.props;

    return (
      <Box>
        <Row sx={{ alignItems: "center" }} mx={[0, 0, 0, -16]}>
          <Col width={3 / 12}>
            <Link to={HOME_URL}>
              <img src={LogoIcon} alt="Hometown" style={{width:"210px"}} />
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
                "+ div": {
                  display: "none",
                  "&:hover": {
                    display: "block"
                  }
                },
                ":hover": {
                  "& + div": {
                    display: "block"
                  }
                }
              }}
            >
              {isLoggedIn ? (
                <Text variant="headerLabel">Hi {titleCase(name)}</Text>
              ) : (
                <UserIcon />
              )}
            </Button>
            <Box pt={20} sx={{ position: "relative" }}>
              <Card variant="card.profileMore">
                <Box variant="card.profileMoreWrapper">
                  {!isLoggedIn && (
                    <Fragment>
                      <Button
                        // as={Link}
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
                        // as={Link}
                        variant="outline.primary"
                        to={LOGIN_URL}
                        onClick={this.handleClick(LOGIN_URL)}
                        width={175}
                        sx={{ display: "block" }}
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
                        sx={{ display: "block" }}
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
                "+ div": {
                  display: "none",
                  "&:hover": {
                    display: "block"
                  }
                },
                ":hover": {
                  "& + div": {
                    display: "block"
                  }
                }
              }}
            >
              <FavIcon />
              <span style={{ marginLeft: "5px" }}>
                {isLoggedIn ? wishListCount : 0}
              </span>
            </Button>
            <Box pt={20} className="cart-popover" sx={{ position: "relative" }}>
              <Card variant="card.profileMore" width={244}>
                <Box variant="card.profileMoreWrapper" px={15} py={15}>
                  {wishlist && wishlist.data.length > 0 && (
                    <Flex mx={-5} my={-5} sx={{ flexWrap: "wrap" }}>
                      {wishlist.data.map(item => (
                        <Box px={5} py={5}>
                          {/* <Image
                            src={`${item.product_info.images[0].url}.jpg`}
                            alt=""
                            width={64}
                            height={64}
                            sx={{ border: 'secondary' }}
                          /> */}
                        </Box>
                      ))}
                    </Flex>
                  )}
                  <Box mt={10} mb={10}>
                    <Text sx={{ fontSize: 14 }}>Already have a list?</Text>
                  </Box>
                  <Flex mx={-5}>
                    <Box width={1 / 2} px={5}>
                      {!isLoggedIn && (
                        <Button to={LOGIN_URL} width={1}>
                          SIGN IN
                        </Button>
                      )}
                    </Box>
                    <Box width={1 / 2} px={5}>
                      {isLoggedIn && (
                        <Button
                          as={Link}
                          to={MY_WISHLIST_URL}
                          variant="outline.primary"
                          width={1}
                        >
                          VIEW ALL
                        </Button>
                      )}
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
                "+ div": {
                  display: "none",
                  "&:hover": {
                    display: "block"
                  }
                },
                ":hover": {
                  "& + div": {
                    display: "block"
                  }
                }
              }}
            >
              <CartIcon />
              <Text variant="headerLabel" ml={5}>
                {cartCount}
              </Text>
            </Flex>
            <Box pt={20} className="cart-popover" sx={{ position: "relative" }}>
              <Card variant="card.profileMore">
                <Box
                  bg="bgOffer"
                  px={20}
                  py={8}
                  sx={{ fontSize: 16, color: "white" }}
                >
                  {cartCount} items in your cart
                </Box>
                <Box variant="card.profileMoreWrapper" px={0}>
                  <Box
                    mb={10}
                    mx={15}
                    width={300}
                    maxHeight={340}
                    sx={{
                      borderBottom: "divider",
                      overflow: "auto"
                    }}
                  >
                    {cartItems.map(item => (
                      <ProductSummaryList
                        qty={item.qty}
                        productItem={{
                          image: `${item.product_info.image}`,
                          unit_price: `${item.product_info.unit_price}`,
                          net_price: `${item.product_info.net_price}`,
                          name: `${item.product_info.name}`,
                          color: `${item.product_info.color}`,
                          stock: `${item.product_info.stock}`,
                          deliveryTimeMessage: `${item.product_info.delivery_time_text}`
                        }}
                        itemInfo={item}
                      />
                    ))}
                  </Box>
                  <Box pb={20} px={[0, 0, 16]}>
                    <Flex
                      width={7 / 12}
                      justifyContent="space-between"
                      ml="auto"
                    >
                      <Text fontFamily="medium">Subtotal</Text>
                      <Text fontFamily="medium">
                        Rs. {this.formatAmount(cartSummary.total)}
                      </Text>
                    </Flex>
                  </Box>
                  <Box px={16}>
                    {cartItems.length > 0 ? (
                      <div>
                        {!this.state.containsOutOfStock ? (
                          <Button
                            width={1}
                            as={Link}
                            onClick={() =>
                              this.checkCartBeforeCheckout(
                                this.props.checkCart,
                                sessionId
                              )(this.props.addToSelectForDemo)
                            }
                            to={DELIVERY_ADDRESS_URL}
                            mb={10}
                          >
                            CHECKOUT NOW
                          </Button>
                        ) : (
                          <Button
                            disabled={this.state.containsOutOfStock}
                            width={1}
                            // as={Link}
                            // onClick={() => this.checkCartBeforeCheckout(checkCart, sessionId)(addToSelectForDemo)}
                            // to={DELIVERY_ADDRESS_URL}
                            mb={10}
                          >
                            CHECKOUT NOW
                          </Button>
                        )}
                      </div>
                    ) : null}
                    <Button
                      width={1}
                      as={Link}
                      to={CART_URL}
                      variant="outline.primary"
                    >
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
          classNames={{ modal: "pincodeModal" }}
          onCloseModal={this.onClosePincodeModal}
          open={this.state.openPincode}
        >
          <Box textAlign="center">
            <Image
              width="100px"
              m="auto"
              mb="1.5rem"
              src={PincodeModalIcon}
              alt="Pincode"
            />
            <Heading fontSize={20} lineHeight={1.3} mb="1rem">
              Please enter your Pincode to serve you better
            </Heading>
            <PinCode color="#f2f2f2" onCloseModal={this.onClosePincodeModal} />
          </Box>
        </ResponsiveModal>

        {/* Login Modal */}
        <ResponsiveModal
          // classNames={{ modal: 'loginModal' }}
          onCloseModal={this.onCloseLoginModal}
          open={this.state.openLogin}
        >
          <LoginForm />
        </ResponsiveModal>

        {/* Signup Modal */}
        <ResponsiveModal
          classNames={{ modal: "signupModal" }}
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
  name: "",
  history: {},
  router: {},
  cartItems: [],
  cartSummary: {},
  // cart: {},
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
  // cart: PropTypes.object,
  wishlist: PropTypes.object,
  addToSelectForDemo: PropTypes.func.isRequired,
  checkCart: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  selectedPincode: PropTypes.any.isRequired,
  loadCart: PropTypes.any.isRequired
};

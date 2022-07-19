import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatProductURL } from "utils/helper";
import * as actionCreators from "redux/modules/cart";
import { formatAmount } from "utils/formatters";

import Box from "hometown-components-dev/lib/BoxHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import * as actionCreatorsForDemo from "redux/modules/selectForDemo"; // New
import * as actionCreatorsForWishlist from "redux/modules/wishlist";
import ResponsiveModal from "components/Modal";
import LoginModal from "containers/Login/LoginForm";

import ProductQuantity from "./UpdateProductQuantity";
import ProductItem from "./Product";
import DeliveryAddress from "./deliveryAddress";
import ApplyCoupon from "./applyCoupon";
import Offers from "./Offers";

/**
 * Images
 */
import CartBreadCumb from "./breadDumb";
import PriceSummary from "./Summary";
import ApplyGiftWrapper from "./ApplyGiftWrapper";
import HappyToHelp from "./HappyToHelp";
import DemoModal from "./DemoModal";

const Delete = require("../../../static/cart/delete.svg");

const styless = require("./productitem.scss");

const despatchClearSelectForDemo = dispatcheroEmpty => {
  const state = [];
  dispatcheroEmpty(state);
};

const checkCartBeforeCheckout = (dispatcher, session) => dispatcheroEmpty => {
  dispatcher(session);
  despatchClearSelectForDemo(dispatcheroEmpty);
};

const despatchSelectForDemo = (id, data, state, dispatchero) => {
  const skuExists = state.some(arr => arr.simpleSku === id);
  const {
    simple_sku: simpleSku,
    product_info: { product_id: productId }
  } = data;

  if (skuExists) {
    state = state.filter(arr => arr.simpleSku !== id);
  } else {
    state.push({ productId, simpleSku });
  }

  dispatchero([...state]);
};

// eslint-disable-next-line max-len
const onClick = (
  cartId,
  sessionId,
  pincode,
  qty,
  configId,
  id,
  data,
  selectForDemo
) => dispatcher => dispatchero => e => {
  e.preventDefault();
  const skuExists = selectForDemo.some(arr => arr.productId === configId);
  if (skuExists) {
    selectForDemo = selectForDemo.filter(arr => arr.productId !== configId);
  }
  dispatchero([...selectForDemo]);
  dispatcher(cartId, sessionId, pincode, qty, configId);
};

const isSelected = (id, state) => state.some(arr => arr.simpleSku === id);

const handleCheckboxClick = (id, data, state) => dispatchero => {
  despatchSelectForDemo(id, data, state, dispatchero);
};

const mapStateToProps = ({
  pincode,
  cart,
  app,
  selectForDemo,
  productdetails,
  wishlist,
  userLogin,
  isPackage
}) => ({
  currentId: cart.key,
  summary: cart.summary,
  cartChecked: cart.cartChecked,
  packageItems: cart.packageItems,
  checkingCart: cart.checkingCart,
  cartContact: cart.contact,
  cartUpdating: cart.cartUpdating,
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId, // New
  demoLandingPageUrl: cart.demo_landing_page_url,
  selectForDemo: selectForDemo.data,
  product: productdetails.productDescription,
  sku: productdetails.productDescription.sku,
  wishListData: wishlist.data,
  isLoggedIn: userLogin.isLoggedIn,
  loadingList: wishlist.data,
  appliedCoupon: cart.summary.coupon
});

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    openLogin: false
  };

  handleLoginModal = () => {
    setOpenLogin(!openLogin);
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     loadWishlist();
  //   }
  // }, [isLoggedIn]);

  render() {
    const {
      demoProductsBanner,
      results,
      packageItems,
      summary,
      removeFromCart,
      toggleWishList,
      loadWishlist,
      pincode,
      sessionId,
      currentId,
      cartUpdating,
      checkCart,
      checkingCart,
      cartTotal,
      appliedCoupon,
      outOfStockList,
      handlePincodeModal,
      demoLandingPageUrl,
      addToSelectForDemo,
      selectForDemo,
      wishListData,
      isLoggedIn,
      wishListWaitList,
      loadingList,
      isPackage,
      cartContact
    } = this.props;
    const cartItemLoading = customerCardId =>
      cartUpdating && currentId === customerCardId;
    const isProductOutofStock = sku => outOfStockList.includes(sku);
    return (
      <div pr="0px" pl="0px">
        <CartBreadCumb />
        <Container my={[30, 30, 60]}>
          <Row>
            {/* Product List */}
            <Box variant="col-8" style={{ paddingTop: "35px" }}>
              <Box pr="0px" pl="0px">
                <DeliveryAddress />
              </Box>
              <Row
                mt={30}
                mb={10}
                mx={0}
                pb={5}
                sx={{
                  borderBottom: "2px solid #F2F2F2"
                }}
              ></Row>
              <div style={{ borderRight: "2px solid #F2F2F2" }}>
                {results.map(item => (
                  <Box
                    style={{
                      background: "#FFF8F4",
                      borderRadius: "10px",
                      marginTop: "30px",
                      marginRight: "20px"
                    }}
                  >
                    {item.is_display ? (
                      <Box key={item.id_customer_cart} py={20}>
                        <Row
                          alignItems="center"
                          sx={{ position: "relative" }}
                          pb={20}
                        >
                          <Box
                            variant="col-3"
                            pr={0}
                            style={{ padding: "15px 0px 0px 45px" }}
                          >
                            <Link
                              to={
                                item.product_info.packageId
                                  ? `/package-catalog/${item.product_info.packageId}`
                                  : formatProductURL(
                                      item.product_info.name,
                                      item.configurable_sku
                                    )
                              }
                            >
                              <ImageShimmer
                                src={`${item.product_info.image}?mode=fill`}
                                height="100%"
                                sx={{
                                  boxShadow: "0 1px 2px 0 #0000033"
                                }}
                              >
                                {imageURL => (
                                  <Image
                                    width={1}
                                    src={imageURL}
                                    alt=""
                                    sx={{
                                      boxShadow: "productThumb"
                                    }}
                                  />
                                )}
                              </ImageShimmer>
                            </Link>
                          </Box>
                          <Box variant="col-9" pl={30}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Link
                                to={
                                  item.product_info.packageId
                                    ? `/package-catalog/${item.product_info.packageId}`
                                    : formatProductURL(
                                        item.product_info.name,
                                        item.configurable_sku
                                      )
                                }
                                style={{ width: "80%" }}
                              >
                                <Box mb={10} style={{ maxWidth: "85%" }}>
                                  <Heading
                                    color="heading"
                                    fontSize={16}
                                    lineHeight={1.4}
                                    fontWeight="normal"
                                  >
                                    {item.product_info.name}
                                  </Heading>
                                </Box>
                              </Link>
                              {item.product_info.packageId ? (
                                <div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                              ) : (
                                <Box textAlign="center">
                                  <ProductQuantity
                                    cartItemLoading={cartItemLoading}
                                    cartId={item.id_customer_cart}
                                    quantity={item.qty}
                                    simpleSku={item.simple_sku}
                                    skuId={item.configurable_sku}
                                    configId={
                                      item.product_info &&
                                      item.product_info.product_id
                                        ? item.product_info.product_id
                                        : ""
                                    }
                                  />
                                </Box>
                              )}

                              <Button
                                variant="link"
                                fontSize={12}
                                mt="-15px"
                                mr="25px"
                                display="flex"
                                alignItems="center"
                                disabled={cartItemLoading(
                                  item.id_customer_cart
                                )}
                                onClick={
                                  item.product_info.packageId
                                    ? onClick(
                                        {
                                          cartIds: item.cart_ids,
                                          packageId: item.product_info.packageId
                                        },
                                        sessionId,
                                        pincode,
                                        item.qty,
                                        item.product_info.product_id,
                                        item.simple_sku,
                                        item,
                                        selectForDemo
                                      )(removeFromCart)(addToSelectForDemo)
                                    : onClick(
                                        {
                                          cartIds: item.cart_ids
                                        },
                                        sessionId,
                                        pincode,
                                        item.qty,
                                        item.product_info.product_id,
                                        item.simple_sku,
                                        item,
                                        selectForDemo
                                      )(removeFromCart)(addToSelectForDemo)
                                }
                              >
                                <Image src={Delete} alt="delete" />
                              </Button>
                            </div>
                            {item.product_info.brand && (
                              <Box mb={15}>
                                <Text color="#999999" fontSize="12px">
                                  By {""} {item.product_info.brand}
                                </Text>
                              </Box>
                            )}

                            <div style={{ display: "flex", marginTop: "20px" }}>
                              <div style={{ marginRight: "5px" }}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    color: "black",
                                    marginBottom: "5px",
                                    fontWeight: 600
                                  }}
                                >
                                  Delivery by:
                                </div>
                                {item.product_info.is_deliverable ? (
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      color: "#999999",
                                      marginTop: "10px"
                                    }}
                                  >
                                    {item.product_info.delivery_time_text
                                      .split(" ")
                                      .splice(2)
                                      .map(items => {
                                        return " " + items;
                                      })}
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      color: "#999999",
                                      marginTop: "10px"
                                    }}
                                  >
                                    {item.product_info.delivery_time_text}
                                  </div>
                                )}
                              </div>
                              <div
                                style={{
                                  marginRight: "5px",
                                  marginLeft: "150px"
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "16px",
                                    color: "#F47020",
                                    marginBottom: "5px",
                                    fontWeight: 600
                                  }}
                                >
                                  ₹
                                  {item.product_info.net_price
                                    ? formatAmount(item.product_info.net_price)
                                    : null}
                                </div>
                                {item.product_info.discount ? (
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      whiteSpace: "nowrap",
                                      marginTop: "10px"
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "#999999",
                                        textDecoration: "line-through"
                                      }}
                                    >
                                      ₹
                                      {item.product_info.unit_price
                                        ? formatAmount(
                                            item.product_info.unit_price
                                          )
                                        : null}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        color: "#F47020",
                                        marginLeft: "5px"
                                      }}
                                    >
                                      {item.product_info.discount}% Off
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            {item.product_info.demo_product && (
                              <div
                                display="inline-block"
                                style={{ marginTop: "20px" }}
                              >
                                <label
                                  className={styless.checkbox_container}
                                  htmlFor={item.simple_sku}
                                >
                                  Select For Virtual Demo
                                  <input
                                    type="checkbox"
                                    id={item.simple_sku}
                                    onClick={() =>
                                      handleCheckboxClick(
                                        item.simple_sku,
                                        item,
                                        selectForDemo
                                      )(addToSelectForDemo)
                                    }
                                    checked={isSelected(
                                      item.simple_sku,
                                      selectForDemo
                                    )}
                                  />
                                  <span className={styless.checkmark}></span>
                                </label>
                              </div>
                            )}
                            {item.product_info.offer_message ? (
                              <Box mt="1rem">
                                <Text
                                  color="orangered"
                                  fontSize="1rem"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {item.product_info.offer_message}
                                </Text>
                              </Box>
                            ) : null}
                          </Box>

                          {isProductOutofStock(item.configurable_sku) && (
                            <Flex
                              alignItems="center"
                              justifyContent="center"
                              bg="overlayLight"
                              flexDirection="column"
                              sx={{
                                position: "absolute",
                                width: "calc(100% - 32px)",
                                height: "calc(100% - 40px)",
                                zIndex: 1,
                                left: 16,
                                top: 20
                              }}
                            >
                              <Heading fontSize={20} pb={10}>
                                This product is out of stock please remove
                                before proceed.
                              </Heading>
                              <Button
                                variant="outline.primary"
                                onClick={
                                  item.product_info.packageId
                                    ? onClick(
                                        {
                                          cartIds: item.cart_ids,
                                          packageId: item.product_info.packageId
                                        },
                                        sessionId,
                                        pincode,
                                        item.qty,
                                        item.product_info.product_id,
                                        item.simple_sku,
                                        item,
                                        selectForDemo
                                      )(removeFromCart)(addToSelectForDemo)
                                    : onClick(
                                        {
                                          cartIds: item.cart_ids
                                        },
                                        sessionId,
                                        pincode,
                                        item.qty,
                                        item.product_info.product_id,
                                        item.simple_sku,
                                        item,
                                        selectForDemo
                                      )(removeFromCart)(addToSelectForDemo)
                                }
                              >
                                Remove
                              </Button>
                            </Flex>
                          )}
                        </Row>
                      </Box>
                    ) : null}

                    <ProductItem
                      isPackage={item.product_info.packageId ? true : false}
                      packageId={item.product_info.packageId}
                    />
                  </Box>
                ))}
              </div>
            </Box>

            <Box variant="col-4">
              <Box
                style={{ paddingTop: "0px" }}
                px={[15, 15, 0]}
                py={[20, 20, 30]}
              >
                <Box pr="0px" pl="0px">
                  <ApplyCoupon price={cartTotal} coupon={appliedCoupon} />
                  <ApplyGiftWrapper />
                </Box>
                <Box>
                  <DemoModal
                    landingPageLink={demoLandingPageUrl}
                    selectedForDemo={selectForDemo.length !== 0}
                  />
                  <PriceSummary
                    summaryPrice={summary}
                    onClick={() =>
                      checkCartBeforeCheckout(
                        checkCart,
                        sessionId
                      )(addToSelectForDemo)
                    }
                  />
                </Box>
                <Box>
                  <Offers cartEmiDetails={summary} />
                </Box>
              </Box>
            </Box>
          </Row>
          <Box pb={20}>
            <HappyToHelp data={cartContact} />
          </Box>
          {!isLoggedIn && (
            <ResponsiveModal
              classNames={{ modal: "loginModal" }}
              onCloseModal={this.handleLoginModal}
              open={this.state.openLogin}
            >
              <Box py={32} px={32}>
                <LoginModal />
              </Box>
            </ResponsiveModal>
          )}
        </Container>
      </div>
    );
  }
}

Cart.propTypes = {
  demoProductsBanner: PropTypes.bool,
  results: PropTypes.array,
  summary: PropTypes.object,
  pincode: PropTypes.string,
  cartUpdating: PropTypes.bool,
  currentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sessionId: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  checkCart: PropTypes.func.isRequired,
  checkingCart: PropTypes.bool,
  outOfStockList: PropTypes.array,
  handlePincodeModal: PropTypes.func.isRequired,
  demoLandingPageUrl: PropTypes.string,
  addToSelectForDemo: PropTypes.func.isRequired,
  selectForDemo: PropTypes.object,
  toggleWishList: PropTypes.func.isRequired,
  loadWishlist: PropTypes.func.isRequired,
  wishListData: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  wishListWaitList: PropTypes.any.isRequired,
  loadingList: PropTypes.any.isRequired
};

Cart.defaultProps = {
  demoProductsBanner: false,
  results: [],
  summary: null,
  pincode: "",
  cartUpdating: false,
  currentId: "",
  checkingCart: false,
  outOfStockList: [],
  demoLandingPageUrl: "",
  selectForDemo: {}
};

export default connect(mapStateToProps, {
  ...actionCreators,
  ...actionCreatorsForDemo,
  ...actionCreatorsForWishlist
})(Cart); // New

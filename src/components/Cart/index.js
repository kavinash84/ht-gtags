import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { bindActionCreators } from 'redux';      //Old
// import { bindActionCreators } from 'redux';      //New
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * Helper / modules
 */
import { formatProductURL } from "utils/helper";
import * as actionCreators from "redux/modules/cart";
import { formatAmount } from "utils/formatters";

/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Label from "hometown-components-dev/lib/LabelHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import CloseIcon from "hometown-components-dev/lib/Icons/Close";
import * as actionCreatorsForDemo from "redux/modules/selectForDemo"; // New
import * as actionCreatorsForWishlist from "redux/modules/wishlist";
// import { groupedAttributes as getgroupedAttributes, getBreadCrumbs, getSimpleSku } from 'selectors/product';
import ResponsiveModal from "components/Modal";
import LoginModal from "containers/Login/LoginForm";

/**
 * Page Components
 */
import ProductQuantity from "./UpdateProductQuantity";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "../PaymentMethods";
import ProductItem from "./Product";
import DeliveryAddress from "./deliveryAddress";
import ApplyCoupon from "./applyCoupon";
import ProductLine from "./ProductLine";
import Offers from "./Offers";

/**
 * Images
 */
const checkoutIcon = require("../../../static/checkout.svg");
const location = require("../../../static/map-icon.svg");
const orderTrackIcon = require("../../../static/shipped.svg");
const demoBanner = require("../../../static/campaign/select-for-demo-banner.jpg");
// const cashbackBanner = require('../../../static/campaign/Cart-banner.jpg');
const saveForLaterIcon = require("../../../static/wishListIcon.png");

import SudoCart from "../PackageCatalog/sudoCart";
import {
  // togglePLPModal,
  toggleProdModal,
  loadPackageSudoCart,
  toggleSCModal,
  loadPackageCatalog
} from "../../redux/modules/lackpackages";

import PackagePDP from "../PackageCatalog/packagePDP";
import CartBreadCumb from "./breadDumb";
import PriceSummary from "./Summary";
import ApplyGiftWrapper from "./ApplyGiftWrapper";
import HappyToHelp from "./HappyToHelp";
import DemoModal from "./DemoModal";

const Delete = require("../../../static/cart/delete.svg");

const styles = require("./Cart.scss");
const styless = require("./productitem.scss");

const despatchClearSelectForDemo = dispatcheroEmpty => {
  const state = [];
  dispatcheroEmpty(state);
};

// const checkCartBeforeCheckoutTop = (dispatcher, session) => dispatcheroEmpty => {
//   // e.preventDefault();
//   dispatcher(session);
//   despatchClearSelectForDemo(dispatcheroEmpty); // New
// };

const checkCartBeforeCheckout = (dispatcher, session) => dispatcheroEmpty => {
  // e.preventDefault();
  dispatcher(session);
  despatchClearSelectForDemo(dispatcheroEmpty); // New
};

// const onClick = (cartId, sessionId, pincode) => dispatcher => e => {   //Old
const despatchSelectForDemo = (id, data, state, dispatchero) => {
  // New
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

const addToWishlist = (
  sku,
  list,
  dispatcher,
  isUserLoggedIn,
  onOpenLoginModal,
  wishListWaitList,
  simpleSku,
  selectedPincode,
  cartId,
  sessionId,
  pincode,
  qty,
  configId,
  loadingList
) => dispatcher2 => e => {
  e.preventDefault();

  const isInWishList = (wList, id) => {
    let disableButton = false;
    wList.forEach(item => {
      if (item.wishlist_info.configurable_sku === id) {
        disableButton = true;
      }
    });
    return disableButton;
  };

  if (isUserLoggedIn) {
    // dispatcher3();
    if (!isInWishList(loadingList, sku)) {
      dispatcher(list, sku, simpleSku, selectedPincode);
    }
    dispatcher2(cartId, sessionId, pincode, qty, configId);
  } else {
    onOpenLoginModal();
  }
};

const countCartItemNumbers = results => {
  let cartItemsNumber = 0;
  results.forEach(result => {
    cartItemsNumber += result.qty;
  });
  return cartItemsNumber;
};
const checkIsAnyProductOutofStoc = (results, outOfStockList) => {
  let isAnyProductOutofStoc = false;
  results.forEach(result => {
    if (outOfStockList.includes(result.configurable_sku) === true) {
      isAnyProductOutofStoc = true;
    }
  });
  return isAnyProductOutofStoc;
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

const getSkusData = data => {
  let arr = Object.keys(data);
  arr = arr.map(item => {
    return { simple_sku: item, qty: 1 };
  });
  return arr;
};

const Cart = ({
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
}) => {
  const cartItemLoading = customerCardId =>
    cartUpdating && currentId === customerCardId;
  const isProductOutofStock = sku => outOfStockList.includes(sku);
  const isAnyProductOutofStoc = checkIsAnyProductOutofStoc(
    results,
    outOfStockList
  );
  const cartItemsNumber = countCartItemNumbers(results);

  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadWishlist();
    }
  }, [isLoggedIn]);

  const handleLoginModal = () => {
    setOpenLogin(!openLogin);
  };

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
                              src={item.product_info.image}
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
                              disabled={cartItemLoading(item.id_customer_cart)}
                              onClick={
                                item.product_info.packageId
                                  ? onClick(
                                      {
                                        skuData: getSkusData(item.simpleSkus),
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
                                        skuData: [
                                          {
                                            simple_sku: item.simple_sku,
                                            qty: item.qty
                                          }
                                        ],
                                        packageId: false
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

                          {/* <Box pb={20}>
                            <Flex alignItems="center">
                              <Image
                                width="initial"
                                height={20}
                                mr={10}
                                src={orderTrackIcon}
                              />
                              <Text
                                color={
                                  item.product_info.delivery_time_text.indexOf(
                                    "Currently"
                                  ) === -1
                                    ? "#090909"
                                    : "red"
                                }
                                fontSize={12}
                              >
                                {item.product_info.delivery_time_text}
                              </Text>
                            </Flex>
                          </Box> */}
                          {/* <Flex alignItems="center"> */}
                          {/* {item.product_info.packageId ? null : (
                              <Button
                                variant="link"
                                fontSize={12}
                                display="flex"
                                alignItems="center"
                                onClick={addToWishlist(
                                  item.configurable_sku,
                                  wishListData,
                                  toggleWishList,
                                  isLoggedIn,
                                  handleLoginModal,
                                  wishListWaitList,
                                  item.simple_sku,
                                  pincode,
                                  // item.id_customer_cart,
                                  {
                                    skuData: [
                                      {
                                        simple_sku: item.simple_sku,
                                        qty: item.qty
                                      }
                                    ],
                                    packageId: false
                                  },
                                  sessionId,
                                  pincode,
                                  item.qty,
                                  item.product_info.product_id,
                                  loadingList,
                                  item,
                                  selectForDemo
                                )(removeFromCart)}
                              >
                                <Image
                                  height={16}
                                  mr={10}
                                  src={saveForLaterIcon}
                                />
                                <Text fontSize={12}>Add to wishlist</Text>
                              </Button>
                            )} */}
                          {/* {item.product_info.packageId ? null : (
                              <Text mx={8} fontSize={16}>
                                {" "}
                                |{" "}
                              </Text>
                            )} */}

                          {/* </Flex> */}
                          {/* {item.product_info.demo_product && (
                            <Box mt={15}>
                              <div className="checkbox">
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
                                /> */}
                          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                          {/* <label htmlFor={item.simple_sku} />
                              </div>
                              <Label
                                htmlFor="seeDemo"
                                ml="10px"
                                fontSize="14px"
                                fontWeight="bold"
                              >
                                Select for Demo
                              </Label>
                            </Box>
                          )} */}
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

                          {/* {item.product_info.assembly_service && (
                      <Box color="uspTitle" fontSize="0.75rem">
                        <Image
                          width="initial"
                          height="20px"
                          mr="0.625rem"
                          mt="4px"
                          mb="50px"
                          float="left"
                          src={assemblyIcon}
                        />
                        <Text color="#575757" fontSize="0.75rem" mt="0" mb="0">
                          Assembly
                        </Text>
                        <Text fontSize="0.875rem" mt="0" mb="0">
                          Offered By Hometown
                        </Text>
                        <Text fontSize="0.875rem" mt="0">
                          <Button
                            className={styles.popoverBtn}
                            fontSize="0.875rem"
                            color="#3cc0dc"
                            btnType="link"
                            p="0"
                          >
                            Details
                          </Button>
                          <Box className={styles.popover}>
                            <Text fontSize="0.875rem" mt="0" mb="0" textAlign="center">
                              Assembly will be done within 48hrs of Delivery & applicable within serviceable limits
                            </Text>
                          </Box>
                        </Text>
                      </Box>
                    )} */}
                        </Box>

                        {/* <Box variant="col-2">
                          <Label color="heading" fontSize={18}>
                            ₹{" "}
                            {item.product_info.net_price >
                            item.product_info.unit_price * item.qty
                              ? formatAmount(
                                  Number(item.product_info.unit_price) *
                                    Number(item.qty)
                                )
                              : formatAmount(
                                  Number(item.product_info.net_price)
                                )}
                          </Label>
                        </Box> */}

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
                              This product is out of stock please remove before
                              proceed.
                            </Heading>
                            <Button
                              variant="outline.primary"
                              // onClick={onClick(
                              //   item.id_customer_cart,
                              //   sessionId,
                              //   pincode
                              // )(removeFromCart)}

                              onClick={
                                item.product_info.packageId
                                  ? onClick(
                                      {
                                        skuData: getSkusData(item.simpleSkus),
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
                                        skuData: [
                                          {
                                            simple_sku: item.simple_sku,
                                            qty: item.qty
                                          }
                                        ],
                                        packageId: false
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
                        {/* 
                           {cartItemLoading(item.product_info.product_id) && (
                          <div className={styles.loadingCart}>
                            <h4>PLEASE WAIT...</h4>
                            <p>WHILE IT UPDATES</p>
                          </div>
                        )}
                        {cartItemLoading(item.id_customer_cart) && (
                          <div className={styles.loadingCart}>
                            <h4>PLEASE WAIT...</h4>
                            <p>WHILE IT UPDATES</p>
                          </div>
                        )} */}
                      </Row>

                      {item.freebie_info && item.freebie_info.name && (
                        <Box
                          display="flex"
                          ml="16.65%"
                          p="15px"
                          style={{
                            background: "#fbfbfb",
                            position: "relative"
                          }}
                        >
                          <Col className="td" variant="col-2" pr="0.625rem">
                            <Link
                              to={formatProductURL(
                                item.freebie_info.name,
                                item.configurable_sku
                              )}
                            >
                              <ImageShimmer
                                src={item.freebie_info.image}
                                height="100px"
                              >
                                {imageURL => (
                                  <Image
                                    styles={{ width: "80%" }}
                                    src={imageURL}
                                    alt=""
                                  />
                                )}
                              </ImageShimmer>
                            </Link>
                          </Col>
                          <Col
                            className="td"
                            variant="col-7"
                            pr="1.5rem"
                            pl="0.3125rem"
                          >
                            <Link
                              to={formatProductURL(
                                item.freebie_info.name,
                                item.configurable_sku
                              )}
                            >
                              <Box mb="10px">
                                <Heading
                                  color="heading"
                                  fontSize={16}
                                  lineHeight={1.4}
                                  fontWeight="normal"
                                >
                                  {item.freebie_info.name}
                                </Heading>
                              </Box>
                            </Link>
                            <Box>
                              <Text
                                color="#575757"
                                fontSize="0.75rem"
                                mt="0"
                                mb="0"
                              >
                                Delivery Details
                              </Text>
                              <Text
                                color={
                                  item.freebie_info.delivery_time_text.indexOf(
                                    "Currently"
                                  ) === -1
                                    ? "green"
                                    : "red"
                                }
                                fontSize="0.875rem"
                                mt="0"
                              >
                                {item.freebie_info.delivery_time_text}
                              </Text>
                            </Box>
                            {item.freebie_info.assembly_service && (
                              <Box color="uspTitle" fontSize="0.75rem">
                                <Text
                                  color="#575757"
                                  fontSize="0.75rem"
                                  mt="0"
                                  mb="0"
                                >
                                  Assembly
                                </Text>
                                <Text fontSize="0.875rem" mt="0" mb="0">
                                  Offered By Hometown
                                </Text>
                                <Text fontSize="0.875rem" mt="0">
                                  <Button
                                    // className={styles.popoverBtn}
                                    fontSize="0.875rem"
                                    color="#3cc0dc"
                                    btnType="link"
                                    p="0"
                                  >
                                    Details
                                  </Button>
                                  <div>
                                    {/* className={styles.popover} */}
                                    <Text
                                      fontSize="0.875rem"
                                      mt="0"
                                      mb="0"
                                      ta="center"
                                    >
                                      Assembly will be done within 48hrs of
                                      Delivery & applicable within serviceable
                                      limits
                                    </Text>
                                  </div>
                                </Text>
                              </Box>
                            )}
                          </Col>
                          <Box className="td" col="3" pr="0.625rem">
                            <Row display="block" m="0">
                              <Box col="12" ta="left">
                                <Label color="textLight" mb="0" mt="0">
                                  Qty. {item.freebie_info.qty}
                                </Label>
                              </Box>
                            </Row>
                            <Box mt="0.3125rem">
                              {item.freebie_info.unit_price !==
                                item.freebie_info.special_price &&
                                item.freebie_info.special_price !== 0 && (
                                  <React.Fragment>
                                    <Label
                                      color="black"
                                      fontSize="0.875rem"
                                      mt="0"
                                    >
                                      Rs.{" "}
                                      {item.freebie_info.net_price >
                                      item.freebie_info.unit_price * item.qty
                                        ? formatAmount(
                                            Number(
                                              item.freebie_info.unit_price
                                            ) * Number(item.qty)
                                          )
                                        : formatAmount(
                                            Number(
                                              item.freebie_info.net_price
                                            ) * Number(item.qty)
                                          )}
                                    </Label>
                                    <br />
                                  </React.Fragment>
                                )}
                            </Box>
                          </Box>
                          <Box className={styles.freebieCartItem} />
                        </Box>
                      )}
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

          {/* Pricing Sidebar */}
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
              {/* <OrderSummary
              itemsTotal={summary.items}
              savings={summary.savings}
              setDiscount={summary.combined_set_discount}
              shipping={summary.shipping_charges}
              totalCart={summary.total}
              loadingnextstep={checkingCart}
              onClick={() =>
                checkCartBeforeCheckout(
                  checkCart,
                  sessionId
                )(addToSelectForDemo)
              }
              outOfStockList={outOfStockList}
              discount={summary.coupon_discount}
              landingPageLink={demoLandingPageUrl}
              selectedForDemo={selectForDemo.length !== 0}
              btnText="SECURE CHECKOUT"
            /> */}
            </Box>
          </Box>
        </Row>
        <Box pb={20}>
          <HappyToHelp data={cartContact} />
        </Box>
        {!isLoggedIn && (
          <ResponsiveModal
            classNames={{ modal: "loginModal" }}
            onCloseModal={handleLoginModal}
            open={openLogin}
          >
            <Box py={32} px={32}>
              <LoginModal />
            </Box>
          </ResponsiveModal>
        )}
      </Container>
    </div>
  );
};

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
  // handlePincodeModal: PropTypes.func.isRequired    //Old
  handlePincodeModal: PropTypes.func.isRequired, // New
  demoLandingPageUrl: PropTypes.string,
  addToSelectForDemo: PropTypes.func.isRequired,
  selectForDemo: PropTypes.object,
  toggleWishList: PropTypes.func.isRequired,
  loadWishlist: PropTypes.func.isRequired,
  wishListData: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  wishListWaitList: PropTypes.any.isRequired,
  loadingList: PropTypes.any.isRequired
  // store: PropTypes.object.isRequired
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
  // addToSelectForDemo: PropTypes.func.isRequired

  // store: {}
};

// export default connect(mapStateToProps, mapDispatchToProps)(Cart); //Old
export default connect(mapStateToProps, {
  ...actionCreators,
  ...actionCreatorsForDemo,
  ...actionCreatorsForWishlist
})(Cart); // New

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * Helper / modules
 */
import { formatProductURL } from 'utils/helper';
import * as actionCreators from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import CloseIcon from 'hometown-components-dev/lib/Icons/Close';

/**
 * Page Components
 */
import ProductQuantity from './UpdateProductQuantity';
import OrderSummary from './OrderSummary';
import PaymentMethods from '../PaymentMethods';

/**
 * Images
 */
const checkoutIcon = require('../../../static/checkout.svg');
const location = require('../../../static/map-icon.svg');
const orderTrackIcon = require('../../../static/shipped.svg');
const saveForLaterIcon = require('../../../static/save-for-later.svg');

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const checkCartBeforeCheckout = (dispatcher, session) => e => {
  e.preventDefault();
  dispatcher(session);
};

const onClick = (cartId, sessionId, pincode) => dispatcher => e => {
  e.preventDefault();
  dispatcher(cartId, sessionId, pincode);
};

const mapStateToProps = ({ pincode, cart, app }) => ({
  currentId: cart.key,
  cartChecked: cart.cartChecked,
  checkingCart: cart.checkingCart,
  cartUpdating: cart.cartUpdating,
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId
});

const Cart = ({
  results,
  summary,
  removeFromCart,
  pincode,
  sessionId,
  currentId,
  cartUpdating,
  checkCart,
  checkingCart,
  outOfStockList,
  handlePincodeModal
}) => {
  const cartItemLoading = customerCardId => cartUpdating && currentId === customerCardId;
  const isProductOutofStock = sku => outOfStockList.includes(sku);
  return (
    <Container my={60}>
      <Row>
        {/* Product List */}
        <Box variant="col-8">
          <Row alignItems="center">
            <Box variant="col-8">
              <Heading>My Shopping Cart : {results.length} Items</Heading>
            </Box>
            <Box variant="col-4" textAlign="right">
              <Button
                height="auto"
                display="flex"
                alignItems="center"
                ml="auto"
                justifyContent="center"
                width={1}
                onClick={checkCartBeforeCheckout(checkCart, sessionId)}
              >
                <Image src={checkoutIcon} alt="Delete" height="18px" mr="0.625rem" />
                SECURE CHECKOUT
              </Button>
            </Box>
            <Row alignItems="center" variant="col-12" mt={20}>
              <Image height="25px" mr={5} src={location} />
              <Label color="textFilter" mr={5}>
                For delivery details
              </Label>
              <Label color="textFilter" onClick={handlePincodeModal} mr={10}>
                {pincode}
              </Label>
              <Button fontSize="16" color="white" onClick={handlePincodeModal}>
                change
              </Button>
            </Row>
          </Row>
          <Row
            mt={30}
            mb={10}
            mx={0}
            pb={5}
            sx={{
              borderBottom: 'heading'
            }}
          >
            <Box variant="col-8" pl={0}>
              <Text fontFamily="medium">Product Details</Text>
            </Box>
            <Box variant="col-2" pl={8}>
              <Text fontFamily="medium">Qty.</Text>
            </Box>
            <Box variant="col-2">
              <Text fontFamily="medium">Price</Text>
            </Box>
          </Row>
          {results.map(item => (
            <Row key={item.id_customer_cart} py={20} alignItems="center" sx={{ position: 'relative' }}>
              <Box variant="col-3" pr={0}>
                <Link to={formatProductURL(item.product_info.name, item.configurable_sku)}>
                  <ImageShimmer
                    src={item.product_info.image}
                    height="100%"
                    sx={{
                      boxShadow: '0 1px 2px 0 #0000033'
                    }}
                  >
                    {imageURL => (
                      <Image
                        width={1}
                        src={imageURL}
                        alt=""
                        sx={{
                          boxShadow: 'productThumb'
                        }}
                      />
                    )}
                  </ImageShimmer>
                </Link>
              </Box>
              <Box variant="col-5" pl={30}>
                <Link to={formatProductURL(item.product_info.name, item.configurable_sku)}>
                  <Box mb={10}>
                    <Heading color="heading" fontSize={16} lineHeight={1.4}>
                      {item.product_info.name}
                    </Heading>
                  </Box>
                  {item.product_info.color && (
                    <Box mb={15}>
                      <Text color="#575757">{item.product_info.color}</Text>
                    </Box>
                  )}
                </Link>
                <Box pb={20}>
                  <Flex alignItems="center">
                    <Image width="initial" height={20} mr={10} src={orderTrackIcon} />
                    <Text
                      color={item.product_info.delivery_time_text.indexOf('Currently') === -1 ? '#090909' : 'red'}
                      fontSize={12}
                    >
                      {item.product_info.delivery_time_text}
                    </Text>
                  </Flex>
                </Box>
                <Flex alignItems="center">
                  <Button variant="link" fontSize={12} display="flex" alignItems="center">
                    <Image height={16} mr={10} src={saveForLaterIcon} />
                    <Text fontSize={12}>Save for later</Text>
                  </Button>
                  <Text mx={8} fontSize={16}>
                    {' '}
                    |{' '}
                  </Text>
                  <Button
                    variant="link"
                    fontSize={12}
                    display="flex"
                    alignItems="center"
                    disabled={cartItemLoading(item.id_customer_cart)}
                    onClick={onClick(item.id_customer_cart, sessionId, pincode)(removeFromCart)}
                  >
                    <CloseIcon width={14} height={14} mr={10} /> Remove
                  </Button>
                </Flex>
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
              <Box variant="col-2" textAlign="center">
                <ProductQuantity
                  cartItemLoading={cartItemLoading}
                  cartId={item.id_customer_cart}
                  quantity={item.qty}
                  simpleSku={item.simple_sku}
                  skuId={item.configurable_sku}
                />
              </Box>
              <Box variant="col-2">
                {/* {item.product_info.unit_price !== item.product_info.special_price &&
                      item.product_info.special_price !== 0 && (
                        <Label color="heading" fontSize="0.875rem" mt="0">
                          <s>₹ {formatAmount(Number(item.product_info.unit_price) * Number(item.qty))}</s>
                        </Label>
                      )}
                    <br /> */}
                <Label color="heading" fontSize={18}>
                  ₹{' '}
                  {item.product_info.special_price === 0
                    ? formatAmount(Number(item.product_info.unit_price) * Number(item.qty))
                    : formatAmount(Number(item.product_info.special_price) * Number(item.qty))}
                </Label>
              </Box>

              {isProductOutofStock(item.configurable_sku) && (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  bg="overlayLight"
                  flexDirection="column"
                  sx={{
                    position: 'absolute',
                    width: 'calc(100% - 32px)',
                    height: 'calc(100% - 40px)',
                    zIndex: 1,
                    left: 16,
                    top: 20
                  }}
                >
                  <Heading fontSize={20} pb={10}>
                    This product is out of stock please remove before proceed.
                  </Heading>
                  <Button
                    variant="outline.primary"
                    onClick={onClick(item.id_customer_cart, sessionId, pincode)(removeFromCart)}
                  >
                    Remove
                  </Button>
                </Flex>
              )}
            </Row>
          ))}
        </Box>

        {/* Pricing Sidebar */}
        <Box variant="col-4">
          <Box bg="sidebar" px={40} py={30}>
            <OrderSummary
              itemsTotal={summary.items}
              savings={summary.savings}
              setDiscount={summary.combined_set_discount}
              shipping={summary.shipping_charges}
              totalCart={summary.total}
              loadingnextstep={checkingCart}
              onClick={checkCartBeforeCheckout(checkCart, sessionId)}
              outOfStockList={outOfStockList}
              discount={summary.coupon_discount}
              btnText="SECURE CHECKOUT"
            />
            <Box pb={20}>
              <Heading fontSize={16} mb={5} color="#2c2e3f">
                Exchange & Return Policy
              </Heading>
              <Text fontSize={14} lineHeight={1.3} fontFamily="light" color="#2c2e3f" pb={5}>
                We are committed to ensuring your satisfaction with any product you have ordered from us...
              </Text>
              <Label
                color="#232324"
                fontSize={12}
                fontFamily="medium"
                sx={{
                  borderBottom: '1px',
                  borderColor: '#232324'
                }}
              >
                <Link to="/return-policy">Read More</Link>
              </Label>
            </Box>
            <Box pb={24}>
              <Heading fontSize={16} mb={5} color="#2c2e3f">
                Terms & Conditions
              </Heading>
              <Text fontSize={14} lineHeight={1.3} fontFamily="light" color="#2c2e3f" pb={5}>
                In using the HomeTown.in service, of Praxis Home Retail Ltd. you are deemed to have accepted the terms
                and conditions..
              </Text>
              <Label color="#232324" fontSize={12} fontFamily="medium" borderBottom="1px" borderColor="#232324">
                <Link to="/terms-and-conditions">Read More</Link>
              </Label>
            </Box>
            <PaymentMethods />
          </Box>
        </Box>
      </Row>
    </Container>
  );
};

Cart.propTypes = {
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
  handlePincodeModal: PropTypes.func.isRequired
};

Cart.defaultProps = {
  results: [],
  summary: null,
  pincode: '',
  cartUpdating: false,
  currentId: '',
  checkingCart: false,
  outOfStockList: []
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

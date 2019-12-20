import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import { formatProductURL } from 'utils/helper';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import * as actionCreators from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';
import ProductQuantity from './UpdateProductQuantity';
import OrderSummary from '../Checkout/OrderSummary';
import PaymentMethods from '../PaymentMethods/';

const styles = require('./Cart.scss');

// const assemblyIcon = require('../../../static/cube-of-notes-stack.svg');
const deleteIcon = require('../../../static/delete.svg');
const location = require('../../../static/map-icon.svg');
const orderTrack = require('../../../static/order-track.svg');

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
    <BoxHtV1 type="block">
      <SectionHtV1 display="flex" pt="1rem" pb="2.5rem" mb="0" height="auto">
        <ContainerHtV1 type="container" pr="0" pl="0">
          <RowHtV1 display="block" mr="0" ml="0">
            <BoxHtV1 variant="col-8" pl="0" pt="0">
              <RowHtV1 type="block" m="0" mb="5" mt="0">
                <HeadingHtV1 mb="1.5rem">
                  My Shopping Cart:{' '}
                  <LabelHtV1 fontSize="1.3rem" fontWeight="300">
                    {' '}
                    X Items
                  </LabelHtV1>
                </HeadingHtV1>
                <BoxHtV1 variant="col-12" pl="0" verticalAlign="middle" display="flex" lineHeight="2">
                  <ImageHtV1 width="initial" height="25px" mr="1rem" mt="3px" float="left" src={location} />
                  <LabelHtV1 color="filterTitle" mt="0" mb="0">
                    For delivery details
                  </LabelHtV1>
                  <LabelHtV1
                    className={styles.borderBottom}
                    color="black"
                    mt="0"
                    ml="1rem"
                    mb="0"
                    mr="1rem"
                    onClick={handlePincodeModal}
                  >
                    {pincode}
                  </LabelHtV1>
                  <ButtonHtV1 fontSize="0.75rem" color="white" btnType="link" onClick={handlePincodeModal}>
                    change
                  </ButtonHtV1>
                </BoxHtV1>
              </RowHtV1>
              <RowHtV1 type="block" m="0" my="1em">
                <BoxHtV1 className="td" variant="col-8" pl="0" px="0">
                  <TextHtV1>Product Details</TextHtV1>
                </BoxHtV1>
                <BoxHtV1 className="td" variant="col-2">
                  Qty
                </BoxHtV1>
                <BoxHtV1 className="td" variant="col-2">
                  Price
                </BoxHtV1>
              </RowHtV1>
              {results.map(item => (
                <RowHtV1 className={styles.cartItem} type="block" m="0" mb="0" mt="0" key={item.id_customer_cart}>
                  <BoxHtV1 className="td" variant="col-2" pl="0" px="0">
                    <Link to={formatProductURL(item.product_info.name, item.configurable_sku)}>
                      <ImageShimmerHtV1
                        src={item.product_info.image}
                        height="100%"
                        sx={{
                          boxShadow: '0 1px 2px 0 #00000033'
                        }}
                      >
                        {imageURL => <ImageHtV1 src={imageURL} alt="" />}
                      </ImageShimmerHtV1>
                    </Link>
                  </BoxHtV1>
                  <BoxHtV1 className="td" variant="col-6">
                    <Link to={formatProductURL(item.product_info.name, item.configurable_sku)}>
                      <BoxHtV1 mb="10px" mt="0.4rem">
                        <LabelHtV1 color="text" mt="0" fontWeight="600" lineSpacing="1px" lineHeight="1.5">
                          {item.product_info.name}
                        </LabelHtV1>
                      </BoxHtV1>
                      <BoxHtV1 mb="15px">
                        <TextHtV1 color="#575757" fontSize="1rem" fontWeight="300" mt="0" mb="0">
                          Lorem Ipsum
                        </TextHtV1>
                      </BoxHtV1>
                    </Link>
                    <BoxHtV1>
                      <TextHtV1
                        color={item.product_info.delivery_time_text.indexOf('Currently') === -1 ? '#090909' : 'red'}
                        fontSize="12px"
                        mt="0"
                        verticalAlign="middle"
                        display="flex"
                        lineHeight="2.5"
                      >
                        <ImageHtV1 width="initial" height="23px" mr="0.625rem" mt="3px" float="left" src={orderTrack} />
                        {item.product_info.delivery_time_text}
                      </TextHtV1>
                    </BoxHtV1>
                    <BoxHtV1 className="td" pr="0.625rem">
                      <TextHtV1
                        color="#090909"
                        fontSize="12px"
                        mt="0"
                        verticalAlign="middle"
                        display="flex"
                        lineHeight="2.5"
                      >
                        <ImageHtV1 width="initial" height="23px" mr="0.625rem" mt="3px" float="left" src={orderTrack} />
                        Save for later
                        <LabelHtV1 mx="0.8em" fontSize="1.8em" lineHeight="1.3">
                          {' '}
                          |{' '}
                        </LabelHtV1>
                        <ButtonHtV1
                          color="#090909"
                          fontSize="12px"
                          mt="0"
                          verticalAlign="middle"
                          display="flex"
                          lineHeight="2.5"
                          btnType="link"
                          p="0"
                          bg="white"
                          className="close"
                          disabled={cartItemLoading(item.id_customer_cart)}
                          onClick={onClick(item.id_customer_cart, sessionId, pincode)(removeFromCart)}
                        >
                          <ImageHtV1 src={deleteIcon} alt="Delete" height="20px" mt="3px" mr="0.625rem" />
                          Remove
                        </ButtonHtV1>
                      </TextHtV1>
                    </BoxHtV1>
                    {/* {item.product_info.assembly_service && (
                      <BoxHtV1 color="uspTitle" fontSize="0.75rem">
                        <ImageHtV1
                          width="initial"
                          height="20px"
                          mr="0.625rem"
                          mt="4px"
                          mb="50px"
                          float="left"
                          src={assemblyIcon}
                        />
                        <TextHtV1 color="#575757" fontSize="0.75rem" mt="0" mb="0">
                          Assembly
                        </TextHtV1>
                        <TextHtV1 fontSize="0.875rem" mt="0" mb="0">
                          Offered By Hometown
                        </TextHtV1>
                        <TextHtV1 fontSize="0.875rem" mt="0">
                          <ButtonHtV1
                            className={styles.popoverBtn}
                            fontSize="0.875rem"
                            color="#3cc0dc"
                            btnType="link"
                            p="0"
                          >
                            Details
                          </ButtonHtV1>
                          <BoxHtV1 className={styles.popover}>
                            <TextHtV1 fontSize="0.875rem" mt="0" mb="0" textAlign="center">
                              Assembly will be done within 48hrs of Delivery & applicable within serviceable limits
                            </TextHtV1>
                          </BoxHtV1>
                        </TextHtV1>
                      </BoxHtV1>
                    )} */}
                  </BoxHtV1>
                  <BoxHtV1 className="td" variant="col-2" textAlign="center">
                    <ProductQuantity
                      cartItemLoading={cartItemLoading}
                      cartId={item.id_customer_cart}
                      quantity={item.qty}
                      simpleSku={item.simple_sku}
                      skuId={item.configurable_sku}
                    />
                  </BoxHtV1>
                  <BoxHtV1 className="td" variant="col-2" textAlign="center">
                    <BoxHtV1 mt="0.3125rem">
                      {/* {item.product_info.unit_price !== item.product_info.special_price &&
                        item.product_info.special_price !== 0 && (
                          <LabelHtV1 color="heading" fontSize="0.875rem" mt="0">
                            <s>₹ {formatAmount(Number(item.product_info.unit_price) * Number(item.qty))}</s>
                          </LabelHtV1>
                        )}
                      <br /> */}
                      <LabelHtV1 color="heading" fontSize="19px" mt="3px">
                        ₹{' '}
                        {item.product_info.special_price === 0
                          ? formatAmount(Number(item.product_info.unit_price) * Number(item.qty))
                          : formatAmount(Number(item.product_info.special_price) * Number(item.qty))}
                      </LabelHtV1>
                    </BoxHtV1>
                  </BoxHtV1>

                  {isProductOutofStock(item.configurable_sku) && (
                    <BoxHtV1 className={styles.loadingCart}>
                      <HeadingHtV1>
                        This product is out of stock please remove before proceed.
                        <br />
                        <ButtonHtV1
                          fontSize="1rem"
                          fontFamily="light"
                          color="#f98d29"
                          btnType="link"
                          p="0"
                          mt="8px"
                          onClick={onClick(item.id_customer_cart, sessionId, pincode)(removeFromCart)}
                        >
                          Remove
                        </ButtonHtV1>
                      </HeadingHtV1>
                    </BoxHtV1>
                  )}
                </RowHtV1>
              ))}
            </BoxHtV1>
            <BoxHtV1 variant="col-4">
              <BoxHtV1 bg="grey" p="1.5em">
                <OrderSummary
                  itemsTotal={summary.items}
                  savings={summary.savings}
                  setDiscount={summary.combined_set_discount}
                  shipping={summary.shipping_charges}
                  totalCart={summary.total}
                  loadingnextstep={checkingCart}
                  onClick={checkCartBeforeCheckout(checkCart, sessionId)}
                  itemsCount={summary.items_count}
                  outOfStockList={outOfStockList}
                  discount={summary.coupon_discount}
                  btnText="SECURE CHECKOUT"
                />
                <PaymentMethods />
                <BoxHtV1 variant="col-12" mt="1em">
                  <HeadingHtV1 fontSize="17px" mb="5px" color="menuItem">
                    Exchange & Return Policy
                  </HeadingHtV1>
                  <TextHtV1 fontSize="16px" fontWeight="300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
                  </TextHtV1>
                  <LabelHtV1
                    color="menuItem"
                    pt="5px"
                    fontSize="12px"
                    fontWeight="600"
                    borderBottom="1px"
                    borderColor="#232324"
                  >
                    Read More
                  </LabelHtV1>
                </BoxHtV1>
                <BoxHtV1 variant="col-12" mt="1em">
                  <HeadingHtV1 fontSize="17px" mb="5px" color="menuItem">
                    Terms & Conditions
                  </HeadingHtV1>
                  <TextHtV1 fontSize="16px" fontWeight="300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
                  </TextHtV1>
                  <LabelHtV1
                    color="menuItem"
                    pt="5px"
                    fontSize="12px"
                    fontWeight="600"
                    borderBottom="1px"
                    borderColor="#232324"
                  >
                    Read More
                  </LabelHtV1>
                </BoxHtV1>
              </BoxHtV1>
            </BoxHtV1>
          </RowHtV1>
        </ContainerHtV1>
      </SectionHtV1>
    </BoxHtV1>
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

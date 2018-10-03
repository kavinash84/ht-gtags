import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import { Label } from 'hometown-components/lib/Label';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import Text from 'hometown-components/lib/Text';
import * as actionCreators from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';
import ProductQuantity from './UpdateProductQuantity';
import OrderSummary from '../Checkout/OrderSummary';

const styles = require('./Cart.scss');

const aeIcon = require('../../../static/american-express.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');
const intBankingIcon = require('../../../static/net-banking.png');
const calendarImage = require('../../../static/calendar.svg');
const assemblyIcon = require('../../../static/cube-of-notes-stack.svg');
const deleteIcon = require('../../../static/delete.svg');
const location = require('../../../static/map-icon.svg');

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
  outOfStockList
}) => {
  const cartItemLoading = customerCardId => cartUpdating && currentId === customerCardId;
  const isProductOutofStock = sku => outOfStockList.includes(sku);
  return (
    <Div type="block">
      <Section display="flex" pt="3rem" pb="2.5rem" mb="0" height="auto">
        <Container type="container" pr="0" pl="0">
          <Row display="block" mr="0" ml="0">
            <Div col="9" pr="1.5rem" pt="0">
              <Row className={styles.pincodeCheck} type="block" m="0" mb="0" mt="0">
                <Div col="12" pr="2rem" pl="0.3125rem">
                  <Img width="initial" height="20px" mr="1rem" mt="3px" float="left" src={location} />
                  <Label color="filterTitle" mt="0" mb="0">
                    Delivery & Assembly details for pincode
                  </Label>
                  <Label className={styles.borderBottom} color="black" mt="0" ml="1rem" mb="0" mr="1rem">
                    400002
                  </Label>
                  <Button fontSize="0.75rem" color="#3cc0dc" btnType="link" p="0">
                    change
                  </Button>
                </Div>
              </Row>
              {results.map(item => (
                <Row className={styles.cartItem} type="block" m="0" mb="0" mt="0" key={item.id_customer_cart}>
                  <Div className="td" col="2" pr="0.625rem">
                    <ImageShimmer src={item.product_info.image} height="131px">
                      {imageURL => <Img src={imageURL} alt="" />}
                    </ImageShimmer>
                  </Div>
                  <Div className="td" col="6" pr="2rem" pl="0.3125rem">
                    <Div mb="10px">
                      <Label color="text" mt="0">
                        {item.product_info.name}
                      </Label>
                    </Div>
                    <Div>
                      <Img width="initial" height="20px" mr="0.625rem" mt="3px" float="left" src={calendarImage} />
                      <Text color="#575757" fontSize="0.75rem" mt="0" mb="0">
                        Delivery Details
                      </Text>
                      <Text fontSize="0.875rem" mt="0">
                        {item.product_info.delivery_time_text}
                      </Text>
                    </Div>
                    <Div color="uspTitle" fontSize="0.75rem">
                      <Img
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
                        <Button fontSize="0.875rem" color="#3cc0dc" btnType="link" p="0">
                          Details
                        </Button>
                      </Text>
                    </Div>
                  </Div>
                  <Div className="td" col="3" pr="0.625rem">
                    <ProductQuantity
                      cartItemLoading={cartItemLoading}
                      cartId={item.id_customer_cart}
                      quantity={item.qty}
                      simpleSku={item.simple_sku}
                      skuId={item.configurable_sku}
                    />
                    <Label color="primary" fontSize="1.125rem" mt="0.625rem">
                      Rs. {formatAmount(item.product_info.net_price)}
                    </Label>
                  </Div>
                  <Div className="td" col="1" pr="0.625rem" ta="right">
                    <Button
                      fontSize="1rem"
                      fontFamily="light"
                      color="#f98d29"
                      btnType="link"
                      p="0"
                      mt="-4px"
                      className="close"
                      onClick={onClick(item.id_customer_cart, sessionId, pincode)(removeFromCart)}
                    >
                      <Img src={deleteIcon} alt="Delete" height="20px" mt="3px" />
                    </Button>
                  </Div>
                  {isProductOutofStock(item.configurable_sku) && (
                    <div className={styles.loadingCart}>
                      <h4>
                        This product is out of stock please remove before proceed.
                        <br />
                        <Button
                          fontSize="1rem"
                          fontFamily="light"
                          color="#f98d29"
                          btnType="link"
                          p="0"
                          mt="8px"
                          onClick={onClick(item.id_customer_cart, sessionId, pincode)(removeFromCart)}
                        >
                          Remove
                        </Button>
                      </h4>
                    </div>
                  )}
                </Row>
              ))}
            </Div>
            <Div col="3">
              <OrderSummary
                itemsTotal={summary.items}
                savings={summary.savings}
                shipping={summary.shipping_charges}
                totalCart={summary.total}
                loadingnextstep={checkingCart}
                onClick={checkCartBeforeCheckout(checkCart, sessionId)}
                itemsCount={summary.items_count}
                outOfStockList={outOfStockList}
              />
              <Div mt="1rem" pl="0.625rem" pr="0.625rem">
                <Heading fontSize="1em" mb="0.625rem" color="secondary">
                  We Accept
                </Heading>
                <Row ml="0" mr="0">
                  <Div col="2" mb="0" p="0 5px">
                    <Img src={visaIcon} alt="visaCard" width="100%" />
                  </Div>
                  <Div col="2" mb="0" p="0 5px">
                    <Img src={mastercardIcon} alt="Master Card" width="100%" />
                  </Div>
                  <Div col="2" mb="0" p="0 5px">
                    <Img src={maestroIcon} alt="Maestro" width="100%" />
                  </Div>
                  <Div col="2" mb="0" p="0 5px">
                    <Img src={aeIcon} alt="Amex" width="100%" />
                  </Div>
                  <Div col="2" mb="0" p="0 5px">
                    <Img src={intBankingIcon} alt="Diners Club" width="100%" />
                  </Div>
                </Row>
                <Row ml="0" mr="0">
                  <Div col="12" mb="0" p="0 10px">
                    <Text mt="0.3125rem" fontSize="0.75rem" color="rgba(0,0,0,0.5)">
                      International card also accepted.
                    </Text>
                  </Div>
                </Row>
              </Div>
            </Div>
          </Row>
        </Container>
      </Section>
    </Div>
  );
};

Cart.propTypes = {
  results: PropTypes.array,
  summary: PropTypes.object,
  pincode: PropTypes.string,
  cartUpdating: PropTypes.bool,
  currentId: PropTypes.string,
  sessionId: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  checkCart: PropTypes.func.isRequired,
  checkingCart: PropTypes.bool,
  outOfStockList: PropTypes.array
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

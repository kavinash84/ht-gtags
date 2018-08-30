import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Section from 'hometown-components/lib/Section';
import ProgressiveImageSchemer from 'hometown-components/lib/ProgressiveImageSchemer';
import * as actionCreators from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';
import ProductQuantity from './UpdateProductQuantity';
import OrderSummary from '../Checkout/OrderSummary';

const styles = require('./Cart.scss');

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
            <Div col="9" pr="2.5rem" pt="0">
              <Row type="block" m="0" mb="1.5rem" mt="0">
                <Div col="12" className="ordersTable">
                  <Row className="tr" type="block" m="0" mb="0.5rem" mt="0">
                    <Div className="th" col="6">
                      Product
                    </Div>
                    <Div className="th" col="2">
                      Delivery
                    </Div>
                    <Div className="th" col="2" width="100px">
                      Quantity
                    </Div>
                    <Div className="th" col="2">
                      Cost
                    </Div>
                  </Row>
                  {results.map(item => (
                    <Row className="tr" type="block" m="0" mb="0.5rem" mt="0" key={item.id_customer_cart}>
                      <Div className="td" col="1">
                        <ProgressiveImageSchemer src={item.product_info.image} height="60px">
                          {imageURL => <img src={imageURL} alt="" />}
                        </ProgressiveImageSchemer>
                      </Div>
                      <Div className="td" col="5">
                        {item.product_info.name}
                      </Div>
                      <Div className="td" col="2">
                        {item.product_info.delivery_time_text}
                      </Div>
                      <Div className="td" col="2">
                        <ProductQuantity
                          cartItemLoading={cartItemLoading}
                          cartId={item.id_customer_cart}
                          quantity={item.qty}
                          simpleSku={item.simple_sku}
                          skuId={item.configurable_sku}
                        />
                      </Div>
                      <Div className="td" col="2">
                        Rs. {formatAmount(item.product_info.net_price)}
                        <Button
                          fontSize="1rem"
                          fontFamily="thin"
                          color="#f98d29"
                          btnType="link"
                          p="0"
                          mt="-4px"
                          className="close"
                          onClick={onClick(item.id_customer_cart, sessionId, pincode)(removeFromCart)}
                        >
                          x
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
                              mt="0"
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
              </Row>
            </Div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

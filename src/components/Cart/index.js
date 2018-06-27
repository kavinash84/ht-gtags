import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Section from 'hometown-components/lib/Section';
import { removeFromCart } from 'redux/modules/cart';
import ProductQuantity from './updateQuantity';
import OrderSummary from '../Checkout/OrderSummary';

const styles = require('./Cart.scss');

const onClick = (cartId, sessionId, pincode) => dispatcher => e => {
  e.preventDefault();
  dispatcher(cartId, sessionId, pincode);
};

const mapStateToProps = ({ pincode, userLogin, cart }) => ({
  currentId: cart.key,
  cartUpdating: cart.cartUpdating,
  pincode: pincode.selectedPincode,
  sessionId: userLogin.sessionId
});

const Cart = ({
  results, summary, discardFromCart, pincode, sessionId, currentId, cartUpdating
}) => {
  const cartItemLoading = customerCardId => cartUpdating && currentId === customerCardId;
  return (
    <Div type="block">
      <Section display="flex" pt="3rem" pb="2.5rem" mb="0" height="auto">
        <Container type="container" pr="0" pl="0">
          <Row display="block" mr="0" ml="0">
            <Div col="9" pr="2.5rem" pt="0">
              <Row type="block" m="0" mb="1.5rem" mt="0">
                <Div col="12">
                  <table className="ordersTable">
                    <tbody>
                      <tr>
                        <th colSpan="2">Product</th>
                        <th>Delivery</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th />
                      </tr>
                      {results && results.length === 0 && <div>Cart Empty</div>}
                      {results.map(item => (
                        <tr key={item.id_customer_cart}>
                          <td>
                            <img className="thumb" src={item.product_info.images[0].path} alt="" />
                          </td>
                          <td>{item.product_info.data.name}</td>
                          <td>
                            {item.product_info.data.delivery_details.length &&
                              item.product_info.data.delivery_details[0].value}
                          </td>
                          <td>
                            <ProductQuantity
                              cartItemLoading={cartItemLoading}
                              cartId={item.id_customer_cart}
                              quantity={item.qty}
                              simpleSku={item.simple_sku}
                              skuId={item.configurable_sku}
                            />
                          </td>
                          <td>{item.product_info.netprice}</td>
                          <td>
                            <Button
                              fontSize="1rem"
                              fontWeight="300"
                              color="#ae8873"
                              btnType="link"
                              onClick={onClick(item.id_customer_cart, sessionId, pincode)(discardFromCart)}
                            >
                              x
                            </Button>
                          </td>
                          {/* eslint-disable */}
                          {cartItemLoading(item.id_customer_cart) && (
                            <div className={styles.loadingCart}>
                              <h4>THIS PRODUCT HAS BEEN</h4>
                              <p>UPDATED TO YOUR CART</p>
                            </div>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Div>
              </Row>
            </Div>
            <OrderSummary
              itemsTotal={summary.items}
              savings={summary.savings}
              shipping={summary.shipping_charges}
              totalCart={summary.total}
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
  discardFromCart: PropTypes.func.isRequired
};

Cart.defaultProps = {
  results: [],
  summary: null,
  pincode: '',
  cartUpdating: false,
  currentId: ''
};

export default connect(mapStateToProps, { discardFromCart: removeFromCart })(Cart);

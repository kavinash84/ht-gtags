import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Section from 'hometown-components/lib/Section';
import * as actionCreators from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';
import ProductQuantity from './UpdateProductQuantity';
import OrderSummary from '../Checkout/OrderSummary';

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
  checkingCart
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
                        <th width="100px">Quantity</th>
                        <th>Cost</th>
                        <th />
                      </tr>
                      {results.map(item => (
                        <tr key={item.id_customer_cart}>
                          <td>
                            <img className="thumb" src={item.product_info.image} alt="" />
                          </td>
                          <td>{item.product_info.name}</td>
                          <td>{item.product_info.delivery_time_text}</td>
                          <td>
                            <ProductQuantity
                              cartItemLoading={cartItemLoading}
                              cartId={item.id_customer_cart}
                              quantity={item.qty}
                              simpleSku={item.simple_sku}
                              skuId={item.configurable_sku}
                            />
                          </td>
                          <td>Rs. {formatAmount(item.product_info.net_price)}</td>
                          <td>
                            <Button
                              fontSize="1rem"
                              fontFamily="thin"
                              color="#f98d29"
                              btnType="link"
                              p="0"
                              mt="-4px"
                              onClick={onClick(item.id_customer_cart, sessionId, pincode)(removeFromCart)}
                            >
                              x
                            </Button>
                          </td>
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
              loadingnextstep={checkingCart}
              onClick={checkCartBeforeCheckout(checkCart, sessionId)}
              itemsCount={summary.items_count}
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
  checkingCart: PropTypes.bool
};

Cart.defaultProps = {
  results: [],
  summary: null,
  pincode: '',
  cartUpdating: false,
  currentId: '',
  checkingCart: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

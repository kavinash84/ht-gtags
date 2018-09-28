import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';
import ShippedTo from 'hometown-components/lib/ShippedTo';
// import PaymentMethod from 'hometown-components/lib/PaymentMethod';
import { bindActionCreators } from 'redux';
import { submitPaymentDetails } from 'redux/modules/paymentoptions';
import Footer from 'components/Footer';
import { formatAmount } from 'utils/formatters';
import { validatePaymentDetails } from 'utils/validation';
import { getCartList, getNotDelivered, getStockOutProducts } from 'selectors/cart';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';

import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';
import PaymentForm from './PaymentForm';

const nextStep = (dispatcher, sessionId, paymentData, cardType) => e => {
  e.preventDefault();
  dispatcher(sessionId, paymentData, cardType);
};

const mapStateToProps = ({
  cart, cart: { summary, error }, address: { shipping }, paymentoptions, app
}) => ({
  results: getCartList(cart),
  summary,
  error,
  shipping,
  paymentDetails: paymentoptions.paymentMethodDetails,
  gateway: paymentoptions.selectedGateway,
  sessionId: app.sessionId,
  paymentFormData: paymentoptions.formData,
  paymentError: paymentoptions.error,
  cardType: paymentoptions.cardType,
  submitting: paymentoptions.submitting,
  submitted: paymentoptions.submitted,
  undelivered: getNotDelivered(cart),
  outOfStockList: getStockOutProducts(cart)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitDetails: submitPaymentDetails
    },
    dispatch
  );

@withRouter
class ReviewOrder extends Component {
  componentDidMount() {
    const { paymentDetails, history } = this.props;
    if (validatePaymentDetails(paymentDetails)) {
      history.push('/checkout/cart');
    }
  }
  render() {
    const {
      summary,
      results,
      shipping,
      paymentDetails,
      submitDetails,
      sessionId,
      history,
      paymentFormData,
      cardType,
      submitting,
      submitted,
      undelivered,
      outOfStockList
    } = this.props;
    const isProductOutofStock = sku => outOfStockList.includes(sku);
    return (
      <Div type="block">
        <MenuCheckout history={history} page="review" />
        <Section display="flex" pt="1.25rem" pb="2.5rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Row display="block" mr="0" ml="0">
              <Div col="9" pr="2.5rem" pt="1.5rem">
                <Row display="block" mr="0" ml="0" mb="1rem">
                  <Div col="5" pr="2rem">
                    <ShippedTo
                      name={shipping.fullName}
                      address={shipping.address}
                      city={shipping.state}
                      pincode={shipping.pincode}
                      state={shipping.state}
                    />
                  </Div>
                  {/* <Div col="4">
                    <PaymentMethod gateway={gateway} cardtype="VISA" info={paymentinfo} />
                    </Div> */}
                </Row>
                <Row type="block" m="0" mb="1.5rem" mt="0">
                  <Div col="12">
                    <table className="ordersTable table">
                      <tbody>
                        <tr>
                          <th colSpan="2">Product</th>
                          <th>Delivery</th>
                          <th width="100px">Quantity</th>
                          <th width="110px">Cost</th>
                        </tr>
                        {results.map(item => (
                          <tr key={item.id_customer_cart}>
                            <td>
                              <ImageShimmer src={item.product_info.image} width="60px" height="60px">
                                {imageURL => <Img width="60px" src={imageURL} alt="" />}
                              </ImageShimmer>
                            </td>
                            <td>{item.product_info.name}</td>
                            <td>{item.product_info.delivery_time_text}</td>
                            <td align="center">{item.qty}</td>
                            <td>Rs. {formatAmount(item.product_info.net_price)}</td>
                            {(!item.product_info.is_deliverable || isProductOutofStock(item.configurable_sku)) && (
                              <td>
                                <h4>
                                  {isProductOutofStock(item.configurable_sku)
                                    ? 'This product is out of stock please remove before proceed.'
                                    : 'This product cannot be delivered to your pincode.'}
                                  <br />
                                  <Link to="/checkout/cart">
                                    <Button
                                      fontSize="1rem"
                                      fontFamily="light"
                                      color="#f98d29"
                                      btnType="link"
                                      p="0"
                                      mt="0"
                                    >
                                      Edit Cart
                                    </Button>
                                  </Link>
                                </h4>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Div>
                </Row>
              </Div>
              {paymentFormData && <PaymentForm />}
              <Div col="3">
                <OrderSummary
                  itemsTotal={summary.items}
                  savings={summary.savings}
                  shipping={summary.shipping_charges}
                  totalCart={summary.total}
                  loadingnextstep={submitting}
                  isSubmitted={submitted}
                  itemsCount={summary.items_count}
                  disabled={undelivered.length > 0 || outOfStockList.length > 0}
                  onClick={nextStep(submitDetails, sessionId, paymentDetails, cardType)}
                />
              </Div>
            </Row>
          </Container>
        </Section>
        <Footer />
      </Div>
    );
  }
}
ReviewOrder.defaultProps = {
  history: {},
  paymentFormData: {},
  cardType: 'visa',
  submitting: false,
  submitted: false,
  undelivered: [],
  outOfStockList: []
};
ReviewOrder.propTypes = {
  summary: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  // checkingCart: PropTypes.bool.isRequired,
  shipping: PropTypes.object.isRequired,
  paymentDetails: PropTypes.object.isRequired,
  submitDetails: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  // gateway: PropTypes.string.isRequired,
  history: PropTypes.object,
  paymentFormData: PropTypes.object,
  cardType: PropTypes.string,
  submitting: PropTypes.bool,
  submitted: PropTypes.bool,
  undelivered: PropTypes.array,
  outOfStockList: PropTypes.array
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewOrder);

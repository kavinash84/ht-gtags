import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import PaymentMethod from 'hometown-components/lib/PaymentMethod';
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

const styles = require('../Cart/Cart.scss');

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
    const [gateway] = Object.keys(paymentDetails);
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
                  <Div col="4">
                    <PaymentMethod gateway={gateway} />
                  </Div>
                </Row>
                <Row type="block" m="0" mb="1.5rem" mt="0">
                  <Div col="12" className="ordersTable">
                    <Row className="tr" type="block" m="0" mb="0.5rem" mt="0">
                      <Div className="th" col="6">
                        Product
                      </Div>
                      <Div className="th" col="2">
                        Delivery
                      </Div>
                      <Div className="th" col="2" width="100px" ta="center">
                        Quantity
                      </Div>
                      <Div className="th" col="2">
                        Cost
                      </Div>
                    </Row>
                    {results.map(item => (
                      <Row className="tr" type="block" m="0" mb="0.5rem" mt="0" key={item.id_customer_cart}>
                        <Div className="td" col="1">
                          <ImageShimmer src={item.product_info.image} height="60px">
                            {imageURL => <img src={imageURL} alt="" />}
                          </ImageShimmer>
                        </Div>
                        <Div className="td" col="5">
                          {item.product_info.name}
                        </Div>
                        <Div className="td" col="2">
                          {item.product_info.delivery_time_text}
                        </Div>
                        <Div className="td" col="2">
                          {item.qty}
                        </Div>
                        <Div className="td" col="2" ta="center">
                          Rs. {formatAmount(item.product_info.net_price)}
                        </Div>
                        {(!item.product_info.is_deliverable || isProductOutofStock(item.configurable_sku)) && (
                          <div className={styles.loadingCart}>
                            <h4>
                              {isProductOutofStock(item.configurable_sku)
                                ? 'This product is out of stock please remove before proceed.'
                                : 'This product cannot be delivered to your pincode.'}
                              <br />
                              <Link to="/checkout/cart">
                                <Label fontSize="0.875rem" fontFamily="light" color="primary" p="0" mt="5px" mb="0">
                                  Edit Cart
                                </Label>
                              </Link>
                            </h4>
                          </div>
                        )}
                      </Row>
                    ))}
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

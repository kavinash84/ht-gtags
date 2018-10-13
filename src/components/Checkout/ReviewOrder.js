import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';
import Container from 'hometown-components/lib/Container';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
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

const calendarImage = require('../../../static/calendar.svg');
const assemblyIcon = require('../../../static/cube-of-notes-stack.svg');

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
        <Section display="flex" pt="1.25rem" pb="3.5rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Row display="block" mr="0" ml="0">
              <Div col="9" pr="2.5rem" pt="1.5rem">
                <Row display="block" mr="0" ml="0">
                  <Div col="12" bg="#969696">
                    <Heading fontSize="1rem" ls="1px" mb="0.625rem" color="white" p="10px 20px" pb="10px">
                      Order Summary
                    </Heading>
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
                        <Text
                          color={item.product_info.delivery_time_text.indexOf('Sorry') === -1 ? 'green' : 'red'}
                          fontSize="0.875rem"
                          mt="0"
                        >
                          {item.product_info.delivery_time_text}
                        </Text>
                      </Div>
                      {item.product_info.assembly_service && (
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
                            <Button
                              className={styles.popoverBtn}
                              fontSize="0.875rem"
                              color="#3cc0dc"
                              btnType="link"
                              p="0"
                            >
                              Details
                            </Button>
                            <div className={styles.popover}>
                              <Text fontSize="0.875rem" mt="0" mb="0" ta="center">
                                Assembly will be done within 48hrs of Delivery & applicable within serviceable limits
                              </Text>
                            </div>
                          </Text>
                        </Div>
                      )}
                    </Div>
                    <Div className="td" col="3" pr="0.625rem">
                      Quantity: {item.qty}
                      <br />
                      {item.product_info.unit_price !== item.product_info.special_price &&
                        item.product_info.special_price !== 0 && (
                        <Label color="black" fontSize="1rem" mt="0.625rem">
                          <s>Rs. {formatAmount(item.product_info.unit_price)}</s>
                        </Label>
                      )}
                      <br />
                      <Label color="primary" fontSize="1.125rem" mt="0.625rem">
                        Rs.{' '}
                        {item.product_info.special_price === 0
                          ? formatAmount(item.product_info.unit_price)
                          : formatAmount(item.product_info.special_price)}
                      </Label>
                    </Div>
                    {(!item.product_info.is_deliverable || isProductOutofStock(item.configurable_sku)) && (
                      <div className={styles.loadingCart}>
                        <h4>
                          {/* eslint-disable*/}
                          {isProductOutofStock(item.configurable_sku)
                            ? 'This product is out of stock please remove before proceed.'
                            : "Sorry, this product isn't deliverable to selected pincode."}
                          <br />
                          {/* eslint-enable */}
                          <Link to="/checkout/delivery-address">
                            <Label fontSize="1rem" fontFamily="light" color="primary" p="0" mt="10px" mb="0">
                              Edit Address
                            </Label>
                          </Link>
                          <Link to="/checkout/cart">
                            <Label fontSize="1rem" fontFamily="light" color="primary" p="0" mt="10px" mb="0">
                              / Edit Cart
                            </Label>
                          </Link>
                        </h4>
                      </div>
                    )}
                  </Row>
                ))}
                <Row display="block" mr="0" ml="0" mb="1rem" mt="1rem">
                  <Div col="6" pr="15px">
                    <ShippedTo
                      name={shipping.fullName}
                      address={shipping.address}
                      city={shipping.state}
                      pincode={shipping.pincode}
                      state={shipping.state}
                    />
                  </Div>
                  <Div col="6">
                    <PaymentMethod gateway={gateway} />
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

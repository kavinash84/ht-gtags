import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import PaymentMethod from 'hometown-components/lib/PaymentMethod';
import { bindActionCreators } from 'redux';
import { submitPaymentDetails } from 'redux/modules/paymentoptions';
import Footer from 'components/Footer';
// import ProductQuantityCounter from '../ProductQuantityCounter';

import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';
// import PaymentForm from './PaymentForm';

const nextStep = (dispatcher, sessionId, paymentData) => e => {
  e.preventDefault();
  dispatcher(sessionId, paymentData);
};

const mapStateToProps = ({
  cart: {
    checkingCart, data, summary, error
  }, shipping, paymentoptions, app
}) => ({
  results: data,
  summary,
  checkingCart,
  error,
  shipping,
  paymentDetails: paymentoptions.paymentMethodDetails,
  gateway: paymentoptions.selectedGateway,
  sessionId: app.sessionId
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
  render() {
    const {
      summary,
      results,
      shipping,
      paymentDetails,
      submitDetails,
      sessionId,
      gateway,
      checkingCart,
      history
    } = this.props;
    const paymentinfo = Object.values(paymentDetails)[0];
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
                    <PaymentMethod gateway={gateway} cardtype="VISA" info={paymentinfo} />
                  </Div>
                </Row>
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
                              <img className="thumb" src={item.product_info.images[0].path} alt="" />
                            </td>
                            <td>{item.product_info.data.name}</td>
                            <td>
                              {item.product_info.data.delivery_details.length &&
                                item.product_info.data.delivery_details[0].value}
                            </td>
                            <td>
                              <center>{item.qty}</center>
                            </td>
                            <td>{item.product_info.netprice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Div>
                </Row>
              </Div>
              {/* <PaymentForm /> */}
              <OrderSummary
                itemsTotal={summary.items}
                savings={summary.savings}
                shipping={summary.shipping_charges}
                totalCart={summary.total}
                loadingnextstep={checkingCart}
                onClick={nextStep(submitDetails, sessionId, paymentDetails)}
              />
            </Row>
          </Container>
        </Section>
        <Footer />
      </Div>
    );
  }
}
ReviewOrder.defaultProps = {
  history: {}
};
ReviewOrder.propTypes = {
  summary: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  checkingCart: PropTypes.bool.isRequired,
  shipping: PropTypes.object.isRequired,
  paymentDetails: PropTypes.object.isRequired,
  submitDetails: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  gateway: PropTypes.string.isRequired,
  history: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);

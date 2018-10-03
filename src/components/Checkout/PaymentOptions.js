import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Heading from 'hometown-components/lib/Heading';
import Footer from 'components/Footer';
// import { Label } from 'hometown-components/lib/Label';
import {
  setSelectedGateway,
  setSelectedPaymentDetails,
  submitPaymentDetails,
  checkPaymentDetails,
  setValidationError
} from 'redux/modules/paymentoptions';
// import BankCard from './BankCard';
// import CardForm from './CardForm';
import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';
import CommonPayments from './CommonPayments';
import { validatePaymentDetails } from '../../utils/validation';

const styles = require('./Checkout.scss');

const nextStep = history => e => {
  e.preventDefault();
  history.push('/checkout/review-order');
};

// const onChangeDetails = (dispatcher, gateway) => e => {
//   const { name, value } = e.target;
//   dispatcher({ gateway, data: { [name]: value } });
// };

const mapStateToProps = ({
  app,
  paymentoptions,
  cart: { checkingCart, cartChecked, summary },
  app: { sessionId }
}) => ({
  selectedGateway: paymentoptions.selectedGateway,
  isFormValid: paymentoptions.isFormValid,
  paymentDetails: paymentoptions.paymentMethodDetails,
  checkingCart,
  cartChecked,
  summary,
  sessionId,
  error: paymentoptions.error,
  submitting: paymentoptions.submitting,
  submitted: paymentoptions.submitted,
  session: app.sessionId
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleGateway: setSelectedGateway,
      setPaymentDetails: setSelectedPaymentDetails,
      validateForm: checkPaymentDetails,
      submitDetails: submitPaymentDetails,
      setError: setValidationError
    },
    dispatch
  );
@withRouter
class PaymentOptions extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  render() {
    const {
      data,
      selectedGateway,
      toggleGateway,
      setPaymentDetails,
      summary,
      submitting,
      history,
      session,
      paymentDetails
    } = this.props;
    return (
      <Div type="block">
        <MenuCheckout history={history} page="payment" />
        <Section display="flex" pt="1.25rem" pb="2.5rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Row display="block" mr="0" ml="0">
              <Div col="8" pr="1rem">
                <Row display="block" mr="0" ml="0">
                  <Div col="12" bg="#969696">
                    <Heading fontSize="1rem" ls="1px" mb="0.625rem" color="white" p="10px 20px" pb="10px">
                      Select Payment Method
                    </Heading>
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0" mt="5px">
                  <Div col="3">
                    {data.map(paymentType =>
                      CommonPayments(
                        paymentType.paymentType,
                        toggleGateway,
                        selectedGateway,
                        setPaymentDetails,
                        paymentType,
                        session,
                        paymentDetails
                      ))}
                  </Div>
                  <Div col="9">
                    <div className={styles.paymentFormOptions}>add here..</div>
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0">
                  <Div col="5">
                    <Button
                      size="block"
                      btnType="primary"
                      fontFamily="regular"
                      height="42px"
                      mt="1.5rem"
                      fontSize="0.875rem"
                      lh="2"
                      onClick={nextStep(history)}
                      disabled={validatePaymentDetails(paymentDetails) || submitting}
                    >
                      {submitting ? 'Please wait...' : 'NEXT : REVIEW BEFORE PAYMENT'}
                    </Button>
                  </Div>
                </Row>
              </Div>
              <Div col="4">
                <OrderSummary
                  itemsTotal={summary.items}
                  savings={summary.savings}
                  shipping={summary.shipping_charges}
                  totalCart={summary.total}
                  onClick={() => null}
                  itemsCount={summary.items_count}
                  hidebutton
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

PaymentOptions.defaultProps = {
  selectedGateway: 'creditcard',
  data: [],
  summary: null,
  // error: null,
  // isCartChecked: false,
  submitting: false,
  session: '',
  history: {}
};

PaymentOptions.propTypes = {
  selectedGateway: PropTypes.string,
  data: PropTypes.array,
  toggleGateway: PropTypes.func.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  summary: PropTypes.object,
  history: PropTypes.object,
  session: PropTypes.string,
  paymentDetails: PropTypes.object.isRequired,
  // setError: PropTypes.func.isRequired,
  // validateForm: PropTypes.func.isRequired,
  // isFormValid: PropTypes.bool.isRequired,

  // error: PropTypes.object,
  // isCartChecked: PropTypes.bool,
  submitting: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOptions);

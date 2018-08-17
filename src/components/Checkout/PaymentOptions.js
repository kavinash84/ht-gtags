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
import Text from 'hometown-components/lib/Text';
import Footer from 'components/Footer';
import {
  setSelectedGateway,
  setSelectedPaymentDetails,
  submitPaymentDetails,
  checkPaymentDetails,
  setValidationError
} from 'redux/modules/paymentoptions';
import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';
import CommonPayments from './CommonPayments';
import { validatePaymentDetails } from '../../utils/validation';

const nextStep = history => e => {
  e.preventDefault();
  history.push('/checkout/review-order');
};

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
  componentWillReceiveProps() {
    // if (this.props.validationerror && nextProps.validationerror === this.props.validationerror) {
    //   // const {
    //   //   submitDetails, `paymentDetails`
    //   // } = this.props;
    //   console.log('Yaar ! ');
    //   // submitDetails(paymentDetails);
    // }
    // if (nextProps.validationerror) {
    //   const { setError } = this.props;
    //   setError();
    //   alert('Please Fill All Details');
    // }
  }
  // nextStep = () => {
  //   const { paymentDetails, submitDetails, sessionId } = this.props;
  //   // validateForm();
  //   const { dispatch } = this.context.store;
  //   dispatch(submitDetails(sessionId, paymentDetails));
  // };
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
              <Div col="9" pr="7rem">
                <Row display="block" mr="0" ml="0">
                  <Div col="12">
                    <Heading fontSize="0.875em" mb="0.625rem" color="secondary">
                      Choose a payment method
                    </Heading>
                    <Text fontSize="0.875em" mb="0.625rem" color="rgba(0, 0, 0, 0.5)">
                      Don’t worry, you’ll be able to review everything in the next step before placing the order
                    </Text>
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0" mt="5px">
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
              <OrderSummary
                itemsTotal={summary.items}
                savings={summary.savings}
                shipping={summary.shipping_charges}
                totalCart={summary.total}
                onClick={() => null}
                itemsCount={summary.items_count}
                hidebutton
              />
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
  session: ''
};

PaymentOptions.propTypes = {
  selectedGateway: PropTypes.string,
  data: PropTypes.array,
  toggleGateway: PropTypes.func.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  summary: PropTypes.object,
  history: PropTypes.object.isRequired,
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

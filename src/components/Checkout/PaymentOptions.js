import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import { setSelectedGateway, setSelectedPaymentDetails } from 'redux/modules/paymentoptions';
// import CardForm from './CardForm';
// import BankCard from './BankCard';
import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';
import CommonPayments from './CommonPayments';

const mapStateToProps = ({ paymentoptions }) => ({
  selectedGateway: paymentoptions.selectedGateway
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleGateway: setSelectedGateway,
      setPaymentDetails: setSelectedPaymentDetails
    },
    dispatch
  );

class PaymentOptions extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  render() {
    const {
      data, selectedGateway, toggleGateway, setPaymentDetails
    } = this.props;
    return (
      <Div type="block">
        <MenuCheckout page="payment" />
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
                    CommonPayments(paymentType.paymentType, toggleGateway, selectedGateway, setPaymentDetails))}
                </Row>
                <Row display="block" mr="0" ml="0">
                  <Div col="4">
                    <Button
                      size="block"
                      btnType="primary"
                      fontWeight="regular"
                      height="42px"
                      mt="1.5rem"
                      fontSize="0.875rem"
                      lh="2"
                    >
                      NEXT : REVIEW BEFORE PAYMENT
                    </Button>
                  </Div>
                </Row>
              </Div>
              <OrderSummary />
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

PaymentOptions.defaultProps = {
  selectedGateway: 'creditcard',
  data: []
};

PaymentOptions.propTypes = {
  selectedGateway: PropTypes.string,
  data: PropTypes.array,
  toggleGateway: PropTypes.func.isRequired,
  setPaymentDetails: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOptions);

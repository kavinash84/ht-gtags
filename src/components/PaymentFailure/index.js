import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import * as actionCreators from 'redux/modules/cart';
import TitleBar from '../TitleBar';

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const mapStateToProps = ({ pincode, cart, app }) => ({
  currentId: cart.key,
  cartChecked: cart.cartChecked,
  checkingCart: cart.checkingCart,
  cartUpdating: cart.cartUpdating,
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId
});

const PaymentFailure = () => (
  <Div type="block">
    <TitleBar title="Payment Failed" />
    <Section display="block" pt="2rem" pb="2.5rem" mb="0" height="auto">
      <Container type="container" pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Heading>Error During Payment</Heading>
            <Text>Dear Customer,</Text>
            <Text>
              The Payment for your order no. <b>2222</b> was not successfull.
            </Text>
          </Div>
        </Row>
      </Container>
    </Section>
  </Div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentFailure);

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import * as actionCreators from 'redux/modules/cart';
import TitleBar from '../TitleBar';

const PaymentFailedIcon = require('../../../static/failed.svg');

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
    <Container type="container" pr="0" pl="0">
      <Section bg="sectionBgDark" display="block" mt="3rem" mb="3rem" p="1.5rem" pt="1.5rem" pb="1.5rem" height="auto">
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Img width="4.5rem" mr="1rem" float="left" src={PaymentFailedIcon} alt="Test" />
            <Heading mt="0">Error During Payment</Heading>
            <Text fontSize="1rem" mb="0">
              Dear Customer, The Payment for your order no. <b>2222</b>
              was not successfull.
            </Text>
          </Div>
        </Row>
      </Section>
    </Container>
  </Div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentFailure);

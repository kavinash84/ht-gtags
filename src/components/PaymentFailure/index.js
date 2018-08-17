import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import TitleBar from '../TitleBar';

const PaymentFailedIcon = require('../../../static/failed.svg');

const PaymentFailure = ({ orderId }) => (
  <Div type="block">
    <TitleBar title="Payment Failed" />
    <Container type="container" pr="0" pl="0">
      <Section bg="sectionBgDark" display="block" mt="3rem" mb="3rem" p="1.5rem" pt="1.5rem" pb="1.5rem" height="auto">
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Img width="4.5rem" mr="1rem" float="left" src={PaymentFailedIcon} alt="Test" />
            <Heading mt="0">Error During Payment</Heading>
            {orderId !== '' ? (
              <Text fontSize="1rem" mb="0">
                Dear Customer, The Payment for your order no.<b> {orderId} </b>
                was not successful.
              </Text>
            ) : (
              <Text fontSize="1rem" mb="0">
                Something went wrong :( Please try later !
              </Text>
            )}
          </Div>
        </Row>
      </Section>
    </Container>
  </Div>
);

PaymentFailure.defaultProps = {
  orderId: ''
};

PaymentFailure.propTypes = {
  orderId: PropTypes.string
};

export default PaymentFailure;

import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import ProductInline from 'hometown-components/lib/ProductInline';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import PaymentMethod from 'hometown-components/lib/PaymentMethod';

import orderData from '../../data/OrderDetails.js';

const OrderDetails = () => (
  <Div type="block">
    <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
            View Order Details
          </Heading>
        </Row>
      </Container>
    </Section>
    <Section
      pt="1.25rem"
      mb="0"
      bg="sectionBgDark"
      boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
      display="flex"
      height="calc(100vh - 105px)"
    >
      <Container type="container" pr="0.5rem" pl="0.5rem">
        <Section p="0">
          <Row display="block" mb="0.625rem" mr="0" ml="0">
            <Div col="5">
              <Label fontSize="1em" fontFamily="light" mb="0">
                Order Number
              </Label>
            </Div>
            <Div col="7">
              <Label fontSize="1em" color="textDark" fontFamily="medium" ta="right" display="block" mb="0">
                {orderData.order_details.order_no}
              </Label>
            </Div>
          </Row>
          <Row display="block" mb="0.625rem" mr="0" ml="0">
            <Div col="5">
              <Label fontSize="1em" fontFamily="light" mb="0">
                Order Date
              </Label>
            </Div>
            <Div col="7">
              <Label fontSize="1em" color="textDark" fontFamily="medium" ta="right" display="block" mb="0">
                {orderData.order_details.order_date}
              </Label>
            </Div>
          </Row>
          <Row display="block" mb="0.625rem" mr="0" ml="0">
            <Div col="5">
              <Label fontSize="1em" fontFamily="light" mb="0">
                Order Total
              </Label>
            </Div>
            <Div col="7">
              <Label fontSize="1em" color="textDark" fontFamily="medium" ta="right" display="block" mb="0">
                {orderData.order_details.order_total}
              </Label>
            </Div>
          </Row>
        </Section>
        <ProductInline itemData={orderData} />
        <ShippedTo shipDetails={orderData.shipped_to} />
        <PaymentMethod />
      </Container>
    </Section>
  </Div>
);

export default OrderDetails;

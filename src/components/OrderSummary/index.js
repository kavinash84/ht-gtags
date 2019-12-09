import React from 'react';
import Container from 'hometown-components-dev/lib/Container';
import Div from 'hometown-components-dev/lib/Div';
import Heading from 'hometown-components-dev/lib/Heading';
import ProductInlineWithQuantity from 'hometown-components-dev/lib/ProductInlineWithQuantity';
import Row from 'hometown-components-dev/lib/Row';
import Button from 'hometown-components-dev/lib/Buttons';
import { Label } from 'hometown-components-dev/lib/Label';
import Section from 'hometown-components-dev/lib/Section';
import ShippedTo from 'hometown-components-dev/lib/ShippedTo';
import PaymentMethod from 'hometown-components-dev/lib/PaymentMethod';

import orderData from '../../data/OrderDetails.js';

const OrderSummary = () => (
  <Div type="block">
    <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
            Order summary
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
        <ShippedTo shipDetails={orderData.shipped_to} />
        <PaymentMethod />
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.25rem" color="textDark" mb="0.625rem" mt="0px" fontFamily="light">
            Products
          </Heading>
        </Row>
        <ProductInlineWithQuantity itemData={orderData} />
        <Section p="0" mt="1rem">
          <Row display="block" mb="0.625rem" mr="0" ml="0">
            <Div col="5">
              <Label fontSize="1em" fontFamily="light" mb="0">
                Items
              </Label>
            </Div>
            <Div col="7">
              <Label fontSize="1em" color="textDark" fontFamily="medium" ta="right" display="block" mb="0">
                {orderData.price}
              </Label>
            </Div>
          </Row>
          <Row display="block" mb="0.625rem" mr="0" ml="0">
            <Div col="5">
              <Label fontSize="1em" fontFamily="light" mb="0">
                Delivery
              </Label>
            </Div>
            <Div col="7">
              <Label fontSize="1em" color="textDark" fontFamily="medium" ta="right" display="block" mb="0">
                Free
              </Label>
            </Div>
          </Row>
          <Row display="block" mr="0" ml="0" mt="1rem">
            <Button btnType="primary" size="block" fontFamily="regular" fontSize="0.875em" height="42px" lh="2">
              PROCEED TO CHECKOUT
            </Button>
          </Row>
        </Section>
      </Container>
    </Section>
  </Div>
);

export default OrderSummary;

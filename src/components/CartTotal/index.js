import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';
import Section from 'hometown-components/lib/Section';

const CartTotal = () => (
  <Div type="block">
    <Section mb="0" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Div col="8">
            <Label color="text" fontWeight="regular" fontSize="1.1rem">
              Cart Cubtotal (1 item)
            </Label>
          </Div>
          <Div col="4">
            <Label ta="right" fontWeight="light" display="block" color="primary">
              Got a coupon?
            </Label>
          </Div>
        </Row>
        <Row display="block" mr="0" ml="0" mb="0.625rem">
          <Div>
            <Label color="textDark">Rs. 29,900</Label>
          </Div>
        </Row>
        <Row display="block" mr="0" ml="0">
          <Button btnType="primary" size="block" fontWeight="regular" fontSize="0.875em" height="42px" lh="2">
            PROCEED TO CHECKOUT
          </Button>
        </Row>
      </Container>
    </Section>
  </Div>
);

export default CartTotal;

import React from 'react';
import Container from 'hometown-components-dev/lib/Container';
import Div from 'hometown-components-dev/lib/Div';
import Section from 'hometown-components-dev/lib/Section';
import Img from 'hometown-components-dev/lib/Img';
import Empty from 'hometown-components-dev/lib/Empty';
// import { CART_URL } from 'helpers/Constants';

const PaymentFailedIcon = require('../../../static/failed.svg');

const PaymentFailure = () => (
  <Div type="block">
    <Container type="container" pr="0" pl="0">
      <Section display="flex" p="0.625rem" pt="2.5rem" pb="1.25rem" mb="0">
        <Empty title="Duhh !!! Something Fishy " subTitle="" btnName="Go to Home" url="/" bg="#fafafa">
          <Img width="100px" src={PaymentFailedIcon} m="auto" alt="Error During Payment" />
        </Empty>
      </Section>
    </Container>
  </Div>
);

export default PaymentFailure;

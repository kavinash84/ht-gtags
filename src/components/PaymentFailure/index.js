import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Empty from 'hometown-components/lib/Empty';
import { CART_URL } from 'helpers/Constants';
import TitleBar from '../TitleBar';

const PaymentFailedIcon = require('../../../static/failed.svg');

const PaymentFailure = () => (
  <Div type="block">
    <TitleBar title="Payment Failed" />
    <Container type="container" pr="0" pl="0">
      <Section display="flex" p="0.625rem" pt="2.5rem" pb="1.25rem" mb="0">
        <Empty
          title="Dear Customer,The Payment for your order was not successful."
          subTitle="Please try again later !"
          btnName="Try Again"
          url={CART_URL}
          bg="#fafafa"
        >
          <Img width="100px" src={PaymentFailedIcon} m="auto" alt="Error During Payment" />
        </Empty>
      </Section>
    </Container>
  </Div>
);

export default PaymentFailure;

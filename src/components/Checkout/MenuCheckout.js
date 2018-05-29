import React from 'react';
import Heading from 'hometown-components/lib/Heading';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';

const BackIcon = require('../../../static/back.jpg');
const styles = require('./Checkout.scss');

const MenuCheckout = () => (
  <Section mb="0.625rem" p="3.5rem 0.5rem 1.375rem" bg="primary" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
    <Container type="container" pr="2rem" pl="2rem">
      <Row display="block" mr="0" ml="0" mb="1rem">
        <Heading fontSize="0.875rem" color="white" mt="0" mb="0" fontFamily="SFPDLight">
          <button className={styles.back}>
            <img src={BackIcon} alt="back" />
          </button>
          CHECKOUT
        </Heading>
      </Row>
      <Row display="block" mr="0" ml="0">
        <Div col="9">
          <Div col="3">
            <a href="#myOrder" className={`${styles.headerLink} ${styles.active}`}>
              Delivery Address
            </a>
          </Div>
          <Div col="3">
            <a href="#myWishlist" className={styles.headerLink}>
              Payment Options
            </a>
          </Div>
          <Div col="3">
            <a href="#myProfile" className={`${styles.headerLink} ${styles.hideArrow}`}>
              Review & Order
            </a>
          </Div>
        </Div>
      </Row>
    </Container>
  </Section>
);

export default MenuCheckout;

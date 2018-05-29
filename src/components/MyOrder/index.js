import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import OrderBlock from './OrderBlock';
import ProductItems from '../../data/RecentlyViewedProducts.js';

const styles = require('./MyOrder.scss');

const MyOrder = () => (
  <Div type="block">
    <Section mb="0.625rem" p="1.375rem 0.5rem 0.75rem" bg="primary" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
      <Container type="container" pr="0.5rem" pl="0.5rem">
        <Row display="block" mr="0" ml="0" mb="1rem">
          <Heading fontSize="1.25rem" color="white" mt="0" mb="0" fontFamily="SFPDLight">
            My Account
          </Heading>
        </Row>
        <Row display="block" mr="0" ml="0">
          <Div col="8">
            <Div col="2">
              <a href="#myOrder" className={`${styles.headerLink} ${styles.active}`}>
                My Orders
              </a>
            </Div>
            <Div col="2">
              <a href="#myWishlist" className={styles.headerLink}>
                My Wishlist
              </a>
            </Div>
            <Div col="2">
              <a href="#myProfile" className={styles.headerLink}>
                My Profile
              </a>
            </Div>
            <Div col="2">
              <a href="#myPoints" className={styles.headerLink}>
                My Points
              </a>
            </Div>
          </Div>
        </Row>
      </Container>
    </Section>
    <Section display="flex" pt="1.25rem" mb="0" height="auto">
      <Container type="container" pr="0.5rem" pl="0.5rem">
        {ProductItems.map(item => <OrderBlock key={item.id} itemData={item} />)}
      </Container>
    </Section>
  </Div>
);

export default MyOrder;

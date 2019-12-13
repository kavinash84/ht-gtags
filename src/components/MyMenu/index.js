import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'hometown-components-dev/lib/Container';
import Div from 'hometown-components-dev/lib/Div';
import Heading from 'hometown-components-dev/lib/Heading';
import Row from 'hometown-components-dev/lib/Row';
import Section from 'hometown-components-dev/lib/Section';
import { MY_ORDER_URL, MY_PROFILE_URL, MY_WISHLIST_URL, MY_ADDRESS_URL, MY_CASES_URL } from 'helpers/Constants';

const styles = require('./MyMenu.scss');

const MyOrder = ({ page }) => (
  <Section mb="0.625rem" p="1.375rem 0.5rem" bg="bg">
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Row display="block" mr="0" ml="0" mb="0.625rem">
        <Heading fontSize="1.25rem" color="text" mt="0" mb="0" pb="2px" fontFamily="regular">
          My Account
        </Heading>
      </Row>
      <Row display="block" mr="0" ml="0">
        <Div col="10">
          <Div col="2">
            <Link to={MY_ORDER_URL} className={`${styles.headerLink} ${page === 'order' ? styles.active : ''}`}>
              My Orders
            </Link>
          </Div>
          <Div col="2">
            <Link to={MY_WISHLIST_URL} className={`${styles.headerLink} ${page === 'wishlist' ? styles.active : ''}`}>
              My Wishlist
            </Link>
          </Div>
          <Div col="2">
            <Link to={MY_PROFILE_URL} className={`${styles.headerLink} ${page === 'profile' ? styles.active : ''}`}>
              My Profile
            </Link>
          </Div>
          <Div col="2">
            <Link to={MY_ADDRESS_URL} className={`${styles.headerLink} ${page === 'address' ? styles.active : ''}`}>
              My Address
            </Link>
          </Div>
          <Div col="2">
            <Link to={MY_CASES_URL} className={`${styles.headerLink} ${page === 'cases' ? styles.active : ''}`}>
              My Cases
            </Link>
          </Div>
          {/*  <Div col="2">
            <Link href="#myPoints" className={`${styles.headerLink} ${page === 'points' ? styles.active : ''}`}>
              My Points
            </Link>
          </Div> */}
        </Div>
      </Row>
    </Container>
  </Section>
);

MyOrder.defaultProps = {
  page: 'order'
};

MyOrder.propTypes = {
  page: PropTypes.string
};

export default MyOrder;

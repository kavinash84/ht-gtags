import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import { Link } from 'react-router-dom';
import { MY_ORDER_URL, MY_PROFILE_URL, MY_WISHLIST_URL } from 'helpers/Constants';

const styles = require('./MyMenu.scss');

const MyOrder = ({ page }) => (
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
            <Link to={MY_ORDER_URL} className={`${styles.headerLink} ${page === 'order' ? styles.active : ''}`}>
              My Orders
            </Link>
          </Div>
          <Div col="2">
            <a href={MY_WISHLIST_URL} className={`${styles.headerLink} ${page === 'wishlist' ? styles.active : ''}`}>
              My Wishlist
            </a>
          </Div>
          <Div col="2">
            <a href={MY_PROFILE_URL} className={`${styles.headerLink} ${page === 'profile' ? styles.active : ''}`}>
              My Profile
            </a>
          </Div>
          <Div col="2">
            <a href="#myPoints" className={`${styles.headerLink} ${page === 'points' ? styles.active : ''}`}>
              My Points
            </a>
          </Div>
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

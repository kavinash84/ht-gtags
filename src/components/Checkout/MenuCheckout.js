import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'hometown-components/lib/Heading';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';

const Back = require('../../../static/arrow_back_black.svg');
const styles = require('./Checkout.scss');

const MenuCheckout = ({ page, history }) => (
  <Section mb="0.625rem" p="1.75rem 0.5rem 1.375rem" bg="block10" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
    <Container type="container" pr="2rem" pl="2rem">
      <Row display="block" mr="0" ml="0" mb="1rem">
        <Heading fontSize="0.875rem" color="text" mt="0" mb="0" fontFamily="medium">
          <button className={styles.back} onClick={() => history.goBack()}>
            <img src={Back} alt="back" />
          </button>
          CHECKOUT
        </Heading>
      </Row>
      <Row display="block" mr="0" ml="0">
        <Div col="9">
          <Div col="3">
            <span className={`${styles.headerLink} ${page === 'delivery' ? styles.active : ''}`}>Delivery Address</span>
          </Div>
          <Div col="3">
            <span className={`${styles.headerLink} ${page === 'payment' ? styles.active : ''}`}>Payment Options</span>
          </Div>
          <Div col="3">
            <span className={`${styles.headerLink} ${styles.hideArrow} ${page === 'review' ? styles.active : ''}`}>
              Review & Order
            </span>
          </Div>
        </Div>
      </Row>
    </Container>
  </Section>
);

MenuCheckout.defaultProps = {
  page: 'delivery'
};

MenuCheckout.propTypes = {
  page: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default MenuCheckout;

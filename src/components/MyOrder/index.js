import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import MyMenu from 'components/MyMenu';
import OrderBlock from './OrderBlock';
// import ProductItems from '../../data/RecentlyViewedProducts.js';

const mapStateToProps = ({ orders }) => ({
  results: orders.data
});

const MyOrder = ({ results }) => (
  <Div type="block">
    <MyMenu page="order" />
    <Section display="flex" pt="1.25rem" mb="0" height="auto">
      <Container type="container" pr="0.5rem" pl="0.5rem">
        {results.map(item => <OrderBlock key={item.order_id} order={item} />)}
      </Container>
    </Section>
  </Div>
);

MyOrder.defaultProps = {
  results: []
};
MyOrder.propTypes = {
  results: PropTypes.array
};
export default connect(
  mapStateToProps,
  null
)(MyOrder);

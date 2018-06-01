import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import MyMenu from 'components/MyMenu';
import OrderBlock from './OrderBlock';
import ProductItems from '../../data/RecentlyViewedProducts.js';

const MyOrder = () => (
  <Div type="block">
    <MyMenu page="order" />
    <Section display="flex" pt="1.25rem" mb="0" height="auto">
      <Container type="container" pr="0.5rem" pl="0.5rem">
        {ProductItems.map(item => <OrderBlock key={item.id} itemData={item} />)}
      </Container>
    </Section>
  </Div>
);

export default MyOrder;

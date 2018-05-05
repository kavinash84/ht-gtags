import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import ProductInline from 'hometown-components/lib/ProductInline';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import ProductItems from '../../data/RecentlyViewedProducts.js';

const MyOrder = () => (
  <Div type="block">
    <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="SFPDLight">
            My Orders
          </Heading>
        </Row>
      </Container>
    </Section>
    <Section
      pt="1.25rem"
      mb="0"
      bg="sectionBgDark"
      boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
      display="flex"
      height="calc(100vh - 105px)"
    >
      <Container type="container" pr="0.5rem" pl="0.5rem">
        {ProductItems.map(item => <ProductInline key={item.id} itemData={item} />)}
      </Container>
    </Section>
  </Div>
);

export default MyOrder;
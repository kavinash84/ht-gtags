import React, { Component } from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Product from 'hometown-components/lib/Product';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import ProductItems from '../../data/RecentlyViewedProducts.js';

export default class Listing extends Component {
  render() {
    // const styles = require('./Listing.scss');

    return (
      <Div type="block">
        <Container type="container" pr="1rem" pl="1rem">
          <Section mb="0" pr="0.5rem" pl="0.5rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" color="textDark" mb="0" mt="0">
                One Seater Sofas (74)
              </Heading>
            </Row>
          </Section>
        </Container>
        <Section pt="1.25rem" mb="0" bg="sectionBgDark" boxShadow="0px 1px 9px 0px rgba(0, 0, 0, 0.20)">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            {ProductItems.map(item => <Product key={item.id} itemData={item} rating />)}
          </Container>
        </Section>
      </Div>
    );
  }
}

import React, { Component } from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'components/Heading';
import Product from 'hometown-components/lib/Product';
import Row from 'components/Row';
import Section from 'components/Section';
import ProductItems from '../../data/RecentlyViewedProducts.js';

export default class Listing extends Component {
  render() {
    // const styles = require('./Listing.scss');

    return (
      <Container>
        <Section>
          <Row>
            <Div>
              <Heading>One Seater Sofas (74)</Heading>
            </Div>
          </Row>
        </Section>
        <Section>
          <Row>
            <Div>{ProductItems.map(item => <Product key={item.id} itemData={item} rating />)}</Div>
          </Row>
        </Section>
      </Container>
    );
  }
}

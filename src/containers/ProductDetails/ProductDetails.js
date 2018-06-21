import React, { Component } from 'react';
import ProductDetailsContainer from 'components/ProductDetails';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import Section from 'hometown-components/lib/Section';

export default class ProductDetails extends Component {
  render() {
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          <Menu />
          <ProductDetailsContainer />
        </div>
        <Footer />
      </Section>
    );
  }
}

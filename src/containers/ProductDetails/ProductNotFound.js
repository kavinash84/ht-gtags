import React from 'react';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

const ProductNotFoundIcon = require('../../../static/product-empty.jpg');

const ProductNotFoundContainer = () => (
  <div>
    <Menu filter search />
    <div className="wrapper">
      <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
        <Empty
          title="Product not found !"
          subTitle="Add products to it"
          btnName="Continue Shopping"
          url="/"
          bg="#fafafa"
        >
          <Img src={ProductNotFoundIcon} width="initial" m="auto" alt="Product not found !" />
        </Empty>
      </Section>
    </div>
    <Footer />
  </div>
);

export default ProductNotFoundContainer;

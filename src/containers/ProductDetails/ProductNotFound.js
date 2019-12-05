import React from 'react';
import Empty from 'hometown-components-dev/lib/Empty';
import Img from 'hometown-components-dev/lib/Img';
import Section from 'hometown-components-dev/lib/Section';

const ProductNotFoundIcon = require('../../../static/product-empty.jpg');

const ProductNotFoundContainer = () => (
  <div className="wrapper">
    <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
      <Empty title="Product not found !" subTitle="Add products to it" btnName="Continue Shopping" url="/" bg="#fafafa">
        <Img src={ProductNotFoundIcon} width="initial" m="auto" alt="Product not found !" />
      </Empty>
    </Section>
  </div>
);

export default ProductNotFoundContainer;

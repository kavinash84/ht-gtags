import React from 'react';
import EmptyHtV1 from 'hometown-components-dev/lib/EmptyHtV1';
import Img from 'hometown-components-dev/lib/Img';
import Section from 'hometown-components-dev/lib/Section';

const ProductNotFoundIcon = require('../../../static/product-empty.jpg');

const ProductNotFoundContainer = () => (
  <div className="wrapper">
    <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
      <EmptyHtV1
        title="Product not found !"
        subTitle="Add products to it"
        btnName="Continue Shopping"
        url="/"
        bg="#fafafa"
      >
        <Img src={ProductNotFoundIcon} width="initial" m="auto" alt="Product not found !" />
      </EmptyHtV1>
    </Section>
  </div>
);

export default ProductNotFoundContainer;

import React from 'react';
import EmptyHtV1 from 'hometown-components-dev/lib/EmptyHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';

const ProductNotFoundIcon = require('../../../static/product-empty.jpg');

const ProductNotFoundContainer = () => (
  <div className="wrapper">
    <SectionHtV1 display="flex" padding="0.625rem" mb={0}>
      <EmptyHtV1
        title="Product not found !"
        subTitle="Add products to it"
        btnName="Continue Shopping"
        url="/"
        bg="#fafafa"
      >
        <ImageHtV1 src={ProductNotFoundIcon} width="initial" margin="auto" alt="Product not found !" />
      </EmptyHtV1>
    </SectionHtV1>
  </div>
);

export default ProductNotFoundContainer;

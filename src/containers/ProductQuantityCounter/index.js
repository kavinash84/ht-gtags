import React from 'react';
import ProductQuantityCounter from 'components/ProductQuantityCounter';

const TestCounter = () => (
  <div>
    <ProductQuantityCounter counterType="listing" />
    <ProductQuantityCounter counterType="detail" />
    <ProductQuantityCounter counterType="cart" />
  </div>
);

export default TestCounter;

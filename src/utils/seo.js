import React from 'react';
/* eslint-disable max-len */

export const productPageTitle = productName => `Buy ${productName} Online at Best Price - HomeTown.in`;

export const productMetaDescription = (productName, productType, materialProductType, color) =>
  `Buy ${productName} online at Best Price. Shop ${materialProductType} in ${color} from amazing designs. Avail discounts upto 50% on ${productType} which will elevate the decor of your house. ✔Fast Shipping ✔Easy Finance Options ✔Free Assembly`;

export const productMetaKeywords = (productType, material) =>
  `${productType}, ${productType} online, buy ${productType}, ${productType} price, ${productType} sale, ${material} ${productType} online shopping`;

export const productSchema = () => (
  <div itemScope itemType="http://schema.org/Product">
    <span itemProp="name">Stark King Bed with Storage</span>
    <img
      itemProp="image"
      src="https://static.hometown.in/media/product/04/0153/5667/1-zoom.jpg"
      alt="Stark King Bed with Storage"
    />
    <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
      {' '}
      Rated <span itemProp="ratingValue">5</span>/5 based on <span itemProp="reviewCount">3</span> customer reviews{' '}
    </div>
    <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
      <span itemProp="priceCurrency" content="INR">
        ₹
      </span>
      <span itemProp="price" content="24900.00">
        24,900.00
      </span>
    </div>
    <span itemProp="description">Always use coasters or mats while keeping hot materials on the wooden surface</span>
  </div>
);

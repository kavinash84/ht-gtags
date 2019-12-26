import React from 'react';
import OfferBanner from '../Home/OfferBanner';
import ProductCarousel from '../ProductCarousel';
import Carousel from './Carousel';
import GridLayout from '../Home/GridView';

const CommonLayout = (component, categoryName, data, isProduct = false) => {
  switch (component) {
    case 1:
      return <Carousel categoryName={categoryName} data={data} />;
    case 2:
      return <GridLayout categoryName={categoryName} data={data} isProduct={isProduct} />;
    case 3:
      return (
        <OfferBanner
          image={data.length ? data[0].image_url : ''}
          url={data.length ? data[0].url_key : ''}
          target={data.length ? data[0].target : ''}
        />
      );
    case 4:
      return <ProductCarousel height="220px" title={categoryName} data={data} length={(data && data.length) || 0} />;
    default:
      return <Carousel categoryName={categoryName} data={data} />;
  }
};

export default CommonLayout;

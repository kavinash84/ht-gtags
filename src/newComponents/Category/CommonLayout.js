import React from 'react';
import ProductCarousel from '../ProductCarousel';
import Carousel from './Carousel';
import GridLayout from '../Home/GridView';

const CommonLayout = (component, categoryName, data, grid = 3) => {
  console.log(grid);

  switch (component) {
    case 1:
      return <Carousel categoryName={categoryName} data={data} />;
    case 2:
      return <GridLayout categoryName={categoryName} data={data} />;
    case 5:
      return <ProductCarousel height="220px" title={categoryName} data={data} length={(data && data.length) || 0} />;
    default:
      return <Carousel categoryName={categoryName} data={data} />;
  }
};

export default CommonLayout;

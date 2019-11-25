import React from 'react';
// import ProductCarousel from 'components/ProductCarousel';
import Carousel from './Carousel';
import GridLayout from './GridLayout';

const CommonLayout = (component, categoryName, data, grid = 3) => {
  switch (component) {
    case 1:
      return <Carousel categoryName={categoryName} data={data} layout="square" />;
    // case 2:
    //   return <Carousel categoryName={categoryName} data={data} layout="round" />;
    case 3:
      return <GridLayout categoryName={categoryName} data={data} layout="square" layoutStyle="grid" col={grid} />;
    // case 4:
    //   return <GridLayout categoryName={categoryName} data={data} layout="round" layoutStyle="grid" col={grid} />;
    // case 5:
    //   return (
    //     <ProductCarousel
    //       height="220px"
    //       pb="1.5rem"
    //       title={categoryName}
    //       data={data}
    //       length={(data && data.length) || 0}
    //     />
    //   );
    default:
      return <Carousel categoryName={categoryName} data={data} layout="square" />;
  }
};

export default CommonLayout;

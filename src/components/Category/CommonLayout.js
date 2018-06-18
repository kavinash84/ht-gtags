import React from 'react';
// import PropTypes from 'prop-types';
import MainSlider from 'components/MainSlider';
// import

const CommonLayout = (component, data) => {
  switch (component) {
    case 1:
      return <MainSlider data={data} />;
    case 2:
      return <MainSlider data={data} />;
    default:
  }
};

export default CommonLayout;

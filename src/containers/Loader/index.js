import React from 'react';
import Loadable from 'react-loadable';
import LoaderShimmer from './LoaderShimmer';

const CustomLoader = () => (
  <div>
    <LoaderShimmer />
  </div>
);

export default opts => {
  const optionsObj = {
    loading: CustomLoader,
    delay: 200,
    timeout: 10,
    ...opts
  };
  return Loadable(optionsObj);
};

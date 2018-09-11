import React from 'react';
import Loadable from 'react-loadable';

const CustomLoader = () => (
  <div>
    <p>Loading...!!</p>
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

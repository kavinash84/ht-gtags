import React from 'react';
import Loadable from 'react-loadable';

const CustomLoader = () => (
  <div>
    <p>Loading...!!</p>
  </div>
);

export default function HomeTownLoader(opts) {
  return Loadable(Object.assign(
    {
      loading: CustomLoader,
      delay: 200,
      timeout: 10
    },
    opts
  ));
}

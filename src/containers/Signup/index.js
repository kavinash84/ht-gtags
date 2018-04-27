import React from 'react';
import Loadable from 'react-loadable';

const SignupLoadable = Loadable({
  loader: () => import('./Signup' /* webpackChunkName: 'Signup' */),
  loading: () => <div>Loading</div>
});

export default SignupLoadable;

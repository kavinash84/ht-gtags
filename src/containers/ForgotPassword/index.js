import React from 'react';
import Loadable from 'react-loadable';

const ForgotPasswordLoadable = Loadable({
  loader: () => import('./ForgotPassword' /* webpackChunkName: 'ForgotPassword' */),
  loading: () => <div>Loading</div>
});

export default ForgotPasswordLoadable;

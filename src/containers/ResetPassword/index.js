import React from 'react';
import Loadable from 'react-loadable';

const ForgotPasswordLoadable = Loadable({
  loader: () => import('./ResetPassword' /* webpackChunkName: 'ResetPassword' */),
  loading: () => <div>Loading</div>
});

export default ForgotPasswordLoadable;

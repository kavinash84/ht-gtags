import React from 'react';
import Loadable from 'react-loadable';
import { provideHooks } from 'redial';
import { checkHashValidity, isHashChecked } from 'redux/modules/forgotpassword';

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    if (!isHashChecked(getState())) {
      await dispatch(checkHashValidity(params.hash));
    }
  }
};
const ResetLoadable = Loadable({
  loader: () => import('./ResetPassword' /* webpackChunkName: 'ResetPassword' */),
  loading: () => <div>Loading</div>
});

export default provideHooks(hooks)(ResetLoadable);

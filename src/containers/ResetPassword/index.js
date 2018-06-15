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
const ProfileLoadable = Loadable({
  loader: () => import('./ResetPassword' /* webpackChunkName: 'Profile' */),
  loading: () => <div>Loading</div>
});

export default provideHooks(hooks)(ProfileLoadable);

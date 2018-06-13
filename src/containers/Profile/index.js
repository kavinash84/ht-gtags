import React from 'react';
import Loadable from 'react-loadable';
import { provideHooks } from 'redial';
import { loadUserProfile, isLoaded as isUserProfileLoaded } from 'redux/modules/profile';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isUserProfileLoaded(getState())) {
      await dispatch(loadUserProfile()).catch(error => console.log(error));
    }
  }
};

const ProfileLoadable = Loadable({
  loader: () => import('./Profile' /* webpackChunkName: 'Profile' */),
  loading: () => <div>Loading</div>
});

export default provideHooks(hooks)(ProfileLoadable);

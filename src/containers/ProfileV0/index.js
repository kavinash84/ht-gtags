import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadUserProfile, isLoaded as isUserProfileLoaded } from 'redux/modules/profile';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isUserProfileLoaded(getState())) {
      await dispatch(loadUserProfile()).catch(error => console.log(error));
    }
  }
};

const Profile = HomeTownLoader({
  loader: () => import('./Profile' /* webpackChunkName: 'Profile' */)
});

export default provideHooks(hooks)(Profile);

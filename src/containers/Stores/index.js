import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      await dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const Stores = HomeTownLoader({
  loader: () => import('./Stores' /* webpackChunkName: 'Stores' */)
});

export default provideHooks(hooks)(Stores);

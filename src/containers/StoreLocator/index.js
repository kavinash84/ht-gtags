import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadStoresData } from 'redux/modules/storelocator';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadStoresData());
  }
};

const StoreLocator = HomeTownLoader({
  loader: () => import('./StoreLocator' /* webpackChunkName: 'StoreLocator' */)
});

export default provideHooks(hooks)(StoreLocator);

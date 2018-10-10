import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';

const hooks = {
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const ModularKitchenMicro = HomeTownLoader({
  loader: () => import('./ModularKitchenMicro' /* webpackChunkName: 'ModularKitchenMicro' */)
});

export default provideHooks(hooks)(ModularKitchenMicro);

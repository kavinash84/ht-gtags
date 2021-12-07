import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { loadModularWardrobeData } from 'redux/modules/modularwardrobe';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadModularWardrobeData()).catch(error => console.log(error));
    // if (!gotData(getState(), 'modularkitchen')) {
    //   await dispatch(getData(`${STATIC_BLOCK_API}/modular_kitchen_react`, 'modularkitchen'));
    // }
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const ModularWardrobe = HomeTownLoader({
  loader: () => import('./ModularWardrobe' /* webpackChunkName: 'ModularWardrobe' */)
});

export default provideHooks(hooks)(ModularWardrobe);



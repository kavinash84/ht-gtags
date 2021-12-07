import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { loadHomeInteriorData } from 'redux/modules/homeinterior';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadHomeInteriorData()).catch(error => console.log(error));
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

const HomeInterior = HomeTownLoader({
  loader: () => import('./HomeInterior' /* webpackChunkName: 'HomeInterior' */)
});

export default provideHooks(hooks)(HomeInterior);

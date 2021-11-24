import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { loadDesignBuildData } from 'redux/modules/designBuild';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadDesignBuildData()).catch(error => console.log(error));
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

const DesignBuild = HomeTownLoader({
  loader: () => import('./DesignBuild' /* webpackChunkName: 'DesignBuild' */)
});

export default provideHooks(hooks)(DesignBuild);

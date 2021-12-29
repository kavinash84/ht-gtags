import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadSpacesData } from '../../redux/modules/spaces';


const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadSpacesData()).catch(error => console.log(error));
  }
  // ,
  // defer: ({ store: { dispatch, getState } }) => {
  //   if (!isStoresLoaded(getState())) {
  //     dispatch(loadStores()).catch(error => console.log(error));
  //   }
  // }
};

const Spaces = HomeTownLoader({
  loader: () => import('./Spaces' /* webpackChunkName: 'Spaces' */)
});

export default provideHooks(hooks)(Spaces);
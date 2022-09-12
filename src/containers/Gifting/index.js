import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadGifting } from 'redux/modules/gifting';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
      await dispatch(loadGifting()).catch(error => console.log(error));
  }
};

const Gifting = HomeTownLoader({
  loader: () => import('./Gifting' /* webpackChunkName: 'Category' */)
});

export default provideHooks(hooks)(Gifting);

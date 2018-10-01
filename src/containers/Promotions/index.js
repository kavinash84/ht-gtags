import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { getData } from 'redux/modules/services';
import { PROMOTIONS as PROMOTIONS_API } from 'helpers/apiUrls';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    dispatch(getData(PROMOTIONS_API, 'promotions'));
  }
};

const Promotions = HomeTownLoader({
  loader: () => import('./Promotions' /* webpackChunkName: /Promotions' */)
});

export default provideHooks(hooks)(Promotions);

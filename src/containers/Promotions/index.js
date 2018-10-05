import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { getData, isLoaded } from 'redux/modules/services';
import { PROMOTIONS as PROMOTIONS_API } from 'helpers/apiUrls';

const hooks = {
  defer: async ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState(), 'promotions')) {
      await dispatch(getData(PROMOTIONS_API, 'promotions'));
    }
  }
};

const Promotions = HomeTownLoader({
  loader: () => import('./Promotions' /* webpackChunkName: /Promotions' */)
});

export default provideHooks(hooks)(Promotions);

import { provideHooks } from 'redial';
import HomeTownLoader from '../../containers/Loader';
import { loadExchangeOffer } from '../../redux/modules/designbuild';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadExchangeOffer());
  }
};

const ThankYouEo = HomeTownLoader({
  loader: () => import('./ThankYouEo')
});
export default provideHooks(hooks)(ThankYouEo);

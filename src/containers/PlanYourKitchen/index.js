import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { STATIC_BLOCK as STATIC_BLOCK_API } from 'helpers/apiUrls';
import { getData, gotData } from 'redux/modules/services';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!gotData(getState(), 'plankitchen')) {
      await dispatch(getData(`${STATIC_BLOCK_API}/plan_your_kitchen_react`, 'plankitchen'));
    }
  }
};
const PlanYourKitchen = HomeTownLoader({
  loader: () => import('./PlanYourKitchen' /* webpackChunkName: 'PlanYourKitchen' */)
});

export default provideHooks(hooks)(PlanYourKitchen);

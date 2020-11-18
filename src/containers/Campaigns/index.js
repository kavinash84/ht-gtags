import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { getLandingData, getLandingCategoryData } from 'redux/modules/landing';
import { loadStoresData } from 'redux/modules/storelocator';

const hooks = {
  fetch: async ({ store: { dispatch }, params }) => {
    await dispatch(getLandingData(params.type));
    await dispatch(getLandingCategoryData());
    await dispatch(loadStoresData());
  }
};

const Campaigns = HomeTownLoader({
  loader: () => import('./CampaignOffer' /* webpackChunkName: comboOffer' */)
});

export default provideHooks(hooks)(Campaigns);

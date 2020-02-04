import HomeTownLoader from 'containers/Loader';

const Promotions = HomeTownLoader({
  loader: () => import('./WeddingCampaign' /* webpackChunkName: weddingCampaign' */)
});

export default Promotions;

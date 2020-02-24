import HomeTownLoader from 'containers/Loader';

const Promotions = HomeTownLoader({
  loader: () => import('./ComboOffer' /* webpackChunkName: comboOffer' */)
});

export default Promotions;

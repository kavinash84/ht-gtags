import HomeTownLoader from 'containers/Loader';

const EmiModal = HomeTownLoader({
  loader: () => import('./EmiModal' /* webpackChunkName: 'EmiModal' */)
});

export default EmiModal;

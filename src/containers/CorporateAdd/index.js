import HomeTownLoader from 'containers/Loader';

const CorporateAdd = HomeTownLoader({
  loader: () => import('./CorporateAdd' /* webpackChunkName: 'CorporateAdd' */)
});

export default CorporateAdd;

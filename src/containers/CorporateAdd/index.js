import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./CorporateAdd' /* webpackChunkName: 'CorporateAdd' */)
  });

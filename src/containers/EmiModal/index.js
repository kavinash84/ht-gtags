import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./EmiModal' /* webpackChunkName: 'EmiModal' */)
  });

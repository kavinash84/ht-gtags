import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./BulkOrder' /* webpackChunkName: 'BulkOrder' */)
  });

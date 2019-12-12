import HomeTownLoader from 'containers/Loader';

const BulkOrder = HomeTownLoader({
  loader: () => import('./BulkOrder' /* webpackChunkName: 'BulkOrder' */)
});

export default BulkOrder;

import HomeTownLoader from 'containers/Loader';

const OrderAndReturn = HomeTownLoader({
  loader: () => import('./OrderAndReturn' /* webpackChunkName: 'OrderAndReturn' */)
});

export default OrderAndReturn;

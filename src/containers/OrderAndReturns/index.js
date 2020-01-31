import HomeTownLoader from 'containers/Loader';

const OrderAndReturns = HomeTownLoader({
  loader: () => import('./OrderAndReturns' /* webpackChunkName: 'orderAndReturns' */)
});

export default OrderAndReturns;

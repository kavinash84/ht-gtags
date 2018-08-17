import HomeTownLoader from 'containers/Loader';

const PaymentFailure = HomeTownLoader({
  loader: () => import('./PaymentFailure' /* webpackChunkName: 'PaymentFailure' */)
});

export default PaymentFailure;

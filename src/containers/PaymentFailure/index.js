import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./PaymentFailure' /* webpackChunkName: 'PaymentFailure' */)
  });

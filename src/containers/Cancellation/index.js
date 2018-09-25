import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./Cancellation' /* webpackChunkName: 'Cancellation' */)
  });

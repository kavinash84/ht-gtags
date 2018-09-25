import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./Terms' /* webpackChunkName: 'Terms' */)
  });

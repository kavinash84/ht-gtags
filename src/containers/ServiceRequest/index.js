import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./ServiceRequest' /* webpackChunkName: /ServiceRequest' */)
  });

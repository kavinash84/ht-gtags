import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./ModularKitchen' /* webpackChunkName: 'ModularKitchen' */)
  });

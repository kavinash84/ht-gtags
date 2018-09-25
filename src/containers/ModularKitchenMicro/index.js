import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./ModularKitchenMicro' /* webpackChunkName: 'ModularKitchenMicro' */)
  });

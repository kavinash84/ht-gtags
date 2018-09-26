import HomeTownLoader from 'containers/Loader';

const ModularKitchenMicro = HomeTownLoader({
  loader: () => import('./ModularKitchenMicro' /* webpackChunkName: 'ModularKitchenMicro' */)
});

export default ModularKitchenMicro;

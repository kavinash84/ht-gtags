import HomeTownLoader from 'containers/Loader';

const ModularKitchenMicro = HomeTownLoader({
  loader: () => import('./ModularKitchen' /* webpackChunkName: 'ModularKitchen' */)
});

export default ModularKitchenMicro;

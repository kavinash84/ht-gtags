import HomeTownLoader from 'containers/Loader';

const ModularKitchen = HomeTownLoader({
  loader: () => import('./ModularKitchen' /* webpackChunkName: 'ModularKitchen' */)
});

export default ModularKitchen;

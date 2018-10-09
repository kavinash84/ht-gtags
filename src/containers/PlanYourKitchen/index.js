import HomeTownLoader from 'containers/Loader';

const PlanYourKitchen = HomeTownLoader({
  loader: () => import('./PlanYourKitchen' /* webpackChunkName: 'PlanYourKitchen' */)
});

export default PlanYourKitchen;

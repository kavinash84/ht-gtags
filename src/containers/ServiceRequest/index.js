import HomeTownLoader from 'containers/Loader';

const ServiceRequest = HomeTownLoader({
  loader: () => import('./ServiceRequest' /* webpackChunkName: /ServiceRequest' */)
});

export default ServiceRequest;

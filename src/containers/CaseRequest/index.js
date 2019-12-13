import HomeTownLoader from 'containers/Loader';

const CaseRequest = HomeTownLoader({
  loader: () => import('./CaseRequest' /* webpackChunkName: /ServiceRequest' */)
});

export default CaseRequest;

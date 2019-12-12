import HomeTownLoader from 'containers/Loader';

const Grievance = HomeTownLoader({
  loader: () => import('./Grievance' /* webpackChunkName: 'Grievance' */)
});

export default Grievance;

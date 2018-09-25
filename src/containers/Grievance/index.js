import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./Grievance' /* webpackChunkName: 'Grievance' */)
  });

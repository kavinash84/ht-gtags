import HomeTownLoader from 'containers/Loader';

const MyCases = HomeTownLoader({
  loader: () => import('./MyCases' /* webpackChunkName: 'MyCases' */)
});

export default MyCases;

import HomeTownLoader from 'containers/Loader';

const MyCases = HomeTownLoader({
  loader: () => import('./MyCases' /* webpackChunkName: 'MyAddress' */)
});

export default MyCases;

import HomeTownLoader from 'containers/Loader';

const DesignBuild = HomeTownLoader({
  loader: () => import('./DesignBuild' /* webpackChunkName: 'DesignBuild' */)
});

export default DesignBuild;

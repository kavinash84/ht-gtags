import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./DesignBuild' /* webpackChunkName: 'DesignBuild' */)
  });

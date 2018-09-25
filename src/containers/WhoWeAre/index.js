import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./WhoWeAre' /* webpackChunkName: 'WhoWeAre' */)
  });

import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./MyAddress' /* webpackChunkName: 'MyAddress' */)
  });

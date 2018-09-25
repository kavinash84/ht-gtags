import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./MyOrder' /* webpackChunkName: 'MyOrder' */)
  });

import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./ReviewOrder' /* webpackChunkName: 'ReviewOrder' */)
  });

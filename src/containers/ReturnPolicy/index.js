import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./ReturnPolicy' /* webpackChunkName: 'ReturnPolicy' */)
  });

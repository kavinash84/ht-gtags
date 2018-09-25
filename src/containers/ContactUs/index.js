import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./ContactUs' /* webpackChunkName: 'ContactUs' */)
  });

import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./PrivacyPolicy' /* webpackChunkName: 'PrivacyPolicy' */)
  });

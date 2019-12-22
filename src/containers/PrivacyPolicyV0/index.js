import HomeTownLoader from 'containers/Loader';

const PrivacyPolicy = HomeTownLoader({
  loader: () => import('./PrivacyPolicy' /* webpackChunkName: 'PrivacyPolicy' */)
});

export default PrivacyPolicy;

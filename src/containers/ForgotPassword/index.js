import HomeTownLoader from 'containers/Loader';

const ForgotPassword = HomeTownLoader({
  loader: () => import('./ForgotPassword' /* webpackChunkName: 'ForgotPassword' */)
});

export default ForgotPassword;

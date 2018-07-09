import HomeTownLoader from 'containers/Loader';

const UpdatePassword = HomeTownLoader({
  loader: () => import('./UpdatePassword' /* webpackChunkName: 'UpdatePassword' */)
});

export default UpdatePassword;

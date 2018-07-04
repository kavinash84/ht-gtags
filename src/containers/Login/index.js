import HomeTownLoader from 'containers/Loader';

const Login = HomeTownLoader({
  loader: () => import('./Login' /* webpackChunkName: 'Login' */)
});

export default Login;

import HomeTownLoader from 'containers/Loader';

const SignUp = HomeTownLoader({
  loader: () => import('./Signup' /* webpackChunkName: 'Signup' */)
});

export default SignUp;

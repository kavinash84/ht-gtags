import HomeTownLoader from 'containers/Loader';

const Terms = HomeTownLoader({
  loader: () => import('./Terms' /* webpackChunkName: 'Terms' */)
});

export default Terms;

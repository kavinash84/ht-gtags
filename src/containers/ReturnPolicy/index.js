import HomeTownLoader from 'containers/Loader';

const ReturnPolicy = HomeTownLoader({
  loader: () => import('./ReturnPolicy' /* webpackChunkName: 'ReturnPolicy' */)
});

export default ReturnPolicy;

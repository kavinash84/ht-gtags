import HomeTownLoader from 'containers/Loader';

const HtExclusive = HomeTownLoader({
  loader: () => import('./HtExclusive' /* webpackChunkName: 'HtExclusive' */)
});

export default HtExclusive;

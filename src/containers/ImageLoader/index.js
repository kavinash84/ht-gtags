import HomeTownLoader from 'containers/Loader';

const Loader = HomeTownLoader({
  loader: () => import('./ImageLoader' /* webpackChunkName: 'Terms' */)
});

export default Loader;

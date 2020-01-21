import HomeTownLoader from 'containers/Loader';

const Coupens = HomeTownLoader({
  loader: () => import('./Coupens' /* webpackChunkName: 'Coupens' */)
});

export default Coupens;

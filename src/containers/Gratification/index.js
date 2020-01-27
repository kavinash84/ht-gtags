import HomeTownLoader from 'containers/Loader';

const Gratification = HomeTownLoader({
  loader: () => import('./Gratification' /* webpackChunkName: 'Gratification' */)
});

export default Gratification;

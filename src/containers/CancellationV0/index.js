import HomeTownLoader from 'containers/Loader';

const Cancellation = HomeTownLoader({
  loader: () => import('./Cancellation' /* webpackChunkName: 'Cancellation' */)
});

export default Cancellation;

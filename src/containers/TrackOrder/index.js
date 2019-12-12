import HomeTownLoader from 'containers/Loader';

const TrackOrder = HomeTownLoader({
  loader: () => import('./TrackOrder' /* webpackChunkName: 'TrackOrder' */)
});

export default TrackOrder;

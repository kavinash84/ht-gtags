import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./TrackOrder' /* webpackChunkName: 'TrackOrder' */)
  });

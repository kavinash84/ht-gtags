import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./Feedback' /* webpackChunkName: 'Feedback' */)
  });

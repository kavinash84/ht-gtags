import HomeTownLoader from 'containers/Loader';

const FlipBokContainer = HomeTownLoader({
  loader: () => import('./flipBook' /* webpackChunkName: 'FlipBookContainer' */)
});

export default FlipBokContainer;

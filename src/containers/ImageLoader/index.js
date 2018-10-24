import HomeTownLoader from 'containers/Loader';

const Test = HomeTownLoader({
  loader: () => import('./ImageLoader' /* webpackChunkName: 'Terms' */)
});

export default Test;

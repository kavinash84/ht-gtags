import HomeTownLoader from 'containers/Loader';

const Test = HomeTownLoader({
  loader: () => import('./Test' /* webpackChunkName: 'Terms' */)
});

export default Test;

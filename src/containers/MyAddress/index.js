import HomeTownLoader from 'containers/Loader';

const MyAddress = HomeTownLoader({
  loader: () => import('./MyAddress' /* webpackChunkName: 'MyAddress' */)
});

export default MyAddress;

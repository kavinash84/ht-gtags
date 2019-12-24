import HomeTownLoader from 'containers/Loader';

const MyOrder = HomeTownLoader({
  loader: () => import('./MyOrder' /* webpackChunkName: 'MyOrder' */)
});

export default MyOrder;

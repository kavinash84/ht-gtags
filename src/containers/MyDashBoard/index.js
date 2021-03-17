import HomeTownLoader from 'containers/Loader';

const MyDashBoard = HomeTownLoader({
  loader: () => import('./MyDashBoard' /* webpackChunkName: 'MyDashBoard' */)
});

export default MyDashBoard;

import HomeTownLoader from 'containers/Loader';

const ReviewOrder = HomeTownLoader({
  loader: () => import('./ReviewOrder' /* webpackChunkName: 'ReviewOrder' */)
});

export default ReviewOrder;

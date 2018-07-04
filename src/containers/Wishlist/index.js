import HomeTownLoader from 'containers/Loader';

const Wishlist = HomeTownLoader({
  loader: () => import('./Wishlist' /* webpackChunkName: 'Wishlist' */)
});

export default Wishlist;

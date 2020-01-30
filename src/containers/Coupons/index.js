import HomeTownLoader from 'containers/Loader';

const Coupons = HomeTownLoader({
  loader: () => import('./Coupons' /* webpackChunkName: 'Coupons' */)
});

export default Coupons;

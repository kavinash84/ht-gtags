import HomeTownLoader from 'containers/Loader';

const Brand = HomeTownLoader({
  loader: () => import('./Brand' /* webpackChunkName: 'Brand' */)
});

export default Brand;

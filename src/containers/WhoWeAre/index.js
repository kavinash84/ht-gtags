import HomeTownLoader from 'containers/Loader';

const WhoWeAre = HomeTownLoader({
  loader: () => import('./WhoWeAre' /* webpackChunkName: 'WhoWeAre' */)
});

export default WhoWeAre;

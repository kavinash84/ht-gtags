import HomeTownLoader from 'containers/Loader';

const Faq = HomeTownLoader({
  loader: () => import('./Faq' /* webpackChunkName: 'Faq' */)
});

export default Faq;

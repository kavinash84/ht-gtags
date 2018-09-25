import HomeTownLoader from 'containers/Loader';

export default () =>
  HomeTownLoader({
    loader: () => import('./Faq' /* webpackChunkName: 'Faq' */)
  });

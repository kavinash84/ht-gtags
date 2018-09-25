import HomeTownLoader from 'containers/Loader';

const Feedback = HomeTownLoader({
  loader: () => import('./Feedback' /* webpackChunkName: 'Feedback' */)
});

export default Feedback;

import HomeTownLoader from 'containers/Loader';

const SavedCards = HomeTownLoader({
  loader: () => import('./SavedCards' /* webpackChunkName: 'SavedCards' */)
});

export default SavedCards;

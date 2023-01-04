import HomeTownLoader from 'containers/Loader';
const ThankyouDb = HomeTownLoader({
  loader: () => import('./ThankyouDb' /* webpackChunkName: ThankyouDb' */)
});
export default ThankyouDb;
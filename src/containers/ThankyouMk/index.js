import HomeTownLoader from 'containers/Loader';
const ThankyouMk = HomeTownLoader({
    loader: () => import('./ThankyouMk' /* webpackChunkName: ThankyouMk' */)
});
export default ThankyouMk;
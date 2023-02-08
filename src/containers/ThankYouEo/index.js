import HomeTownLoader from '../../containers/Loader';

const ThankYouEo = HomeTownLoader({
    loader: () => import('./ThankYouEo')
});
export default ThankYouEo;

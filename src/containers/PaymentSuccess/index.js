import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
// import { loadCart, isLoaded as isCartLoaded } from 'redux/modules/cart';

const hooks = {};
const PaymentSuccess = HomeTownLoader({
  loader: () => import('./PaymentSuccess' /* webpackChunkName: 'PaymentSuccess' */)
});

export default provideHooks(hooks)(PaymentSuccess);

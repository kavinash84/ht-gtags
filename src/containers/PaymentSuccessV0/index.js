import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { load, isLoaded as isPaymentStatusLoaded } from 'redux/modules/paymentstatus';
import { setOrderId, setWalletName } from 'redux/modules/app';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { sessionId, walletName }
    } = getState();
    // console.log('Inside hooks of success payment index.js', !isPaymentStatusLoaded(getState()));
    // if (sessionId && !isPaymentStatusLoaded(getState())) {
    // console.log(walletName, 'walletName');
    // console.log(sessionId, 'sessionId');
    if (walletName === 'Paytm' || walletName === 'Mobikwik') {
      // console.log('Inside walletName', walletName);
      if (sessionId && !isPaymentStatusLoaded(getState())) {
        // console.log('inside if block', sessionId);
        await dispatch(load(sessionId));
        await dispatch(setOrderId(''));
        await dispatch(setWalletName(''));
      } else {
        await dispatch(setOrderId(''));
      }
    }
  }
};
const PaymentSuccess = HomeTownLoader({
  loader: () => import('./PaymentSuccess' /* webpackChunkName: 'PaymentSuccess' */)
});

export default provideHooks(hooks)(PaymentSuccess);

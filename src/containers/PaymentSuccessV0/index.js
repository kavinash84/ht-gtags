import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { load, isLoaded as isPaymentStatusLoaded } from 'redux/modules/paymentstatus';
import { setOrderId, setWalletName } from 'redux/modules/app';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { sessionId, walletName }
    } = getState();
    // if (sessionId && !isPaymentStatusLoaded(getState())) {
    if (walletName === 'Paytm' || walletName === 'Mobikwik') {
      if (sessionId && !isPaymentStatusLoaded(getState())) {
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

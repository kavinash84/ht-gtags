import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { setOrderId } from 'redux/modules/app';
import { isLoaded as isPaymentStatusLoaded } from 'redux/modules/paymentstatus';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { orderId }
    } = getState();
    if (orderId && isPaymentStatusLoaded(getState())) {
      await dispatch(setOrderId(''));
    }
  }
};

const PaymentSuccess = HomeTownLoader({
  loader: () => import('./PaymentSuccess' /* webpackChunkName: 'PaymentSuccess' */)
});

export default provideHooks(hooks)(PaymentSuccess);

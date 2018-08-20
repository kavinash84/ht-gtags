import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { load, isLoaded as isPaymentStatusLoaded } from 'redux/modules/paymentstatus';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const { app: { sessionId } } = getState();
    if (sessionId && !isPaymentStatusLoaded(getState())) {
      await dispatch(load(sessionId));
    }
  }
};
const PaymentSuccess = HomeTownLoader({
  loader: () => import('./PaymentSuccess' /* webpackChunkName: 'PaymentSuccess' */)
});

export default provideHooks(hooks)(PaymentSuccess);

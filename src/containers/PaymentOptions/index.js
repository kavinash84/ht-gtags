import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { load, setSelectedGatewayInSession } from 'redux/modules/paymentoptions';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const { app: { sessionId }, cart, address: { shipping: { pincode, fullName, phone } } } = getState();
    if ((cart && cart.length !== 0) || (pincode !== '' || fullName !== '' || phone !== '')) {
      await dispatch(load(sessionId));
      /* setting default paymentGateway in API */
      dispatch(setSelectedGatewayInSession('CreditCard', sessionId));
    }
  }
};

const PaymentOptions = HomeTownLoader({
  loader: () => import('./PaymentOptions' /* webpackChunkName: 'PaymentOptions' */)
});

export default provideHooks(hooks)(PaymentOptions);

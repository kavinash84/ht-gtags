import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { PINCODE } from 'helpers/Constants';
import { loadCart, isLoaded as isCartLoaded } from 'redux/modules/cart';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const { app: { sessionId }, pincode: { selectedPincode } } = getState();
    if (sessionId && !isCartLoaded(getState())) {
      const pincode = selectedPincode === '' ? PINCODE : selectedPincode;
      dispatch(loadCart(sessionId, pincode)).catch(error => console.log(error));
    }
  }
};
const Cart = HomeTownLoader({
  loader: () => import('./Cart' /* webpackChunkName: 'Cart' */)
});

export default provideHooks(hooks)(Cart);

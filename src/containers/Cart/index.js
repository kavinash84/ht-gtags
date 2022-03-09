import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { PINCODE } from 'helpers/Constants';
import { loadCart } from 'redux/modules/cart';
import { getLandingData, getLandingCategoryData } from "redux/modules/landing";

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { sessionId },
      pincode: { selectedPincode }
    } = getState();
    await dispatch(getLandingData("added-from-cart"));
    if (sessionId) {
      const pincode = selectedPincode === '' ? PINCODE : selectedPincode;
      dispatch(loadCart(sessionId, pincode)).catch(error => console.log(error));
    }
  }
};
const Cart = HomeTownLoader({
  loader: () => import('./Cart' /* webpackChunkName: 'Cart' */)
});

export default provideHooks(hooks)(Cart);

import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadMyAddress } from 'redux/modules/myaddress';

const hooks = {
  defer: async ({ store: { dispatch, getState } }) => {
    const {
      userLogin: { isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      await dispatch(loadMyAddress());
    }
  }
};
const DeliveryAddress = HomeTownLoader({
  loader: () => import('./DeliveryAddress' /* webpackChunkName: 'DeliveryAddress' */)
});

export default provideHooks(hooks)(DeliveryAddress);

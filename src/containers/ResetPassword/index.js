import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { checkHashValidity, isHashChecked } from 'redux/modules/forgotpassword';

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    if (!isHashChecked(getState())) {
      await dispatch(checkHashValidity(params.hash));
    }
  }
};

const ResetPassword = HomeTownLoader({
  loader: () => import('./ResetPassword' /* webpackChunkName: 'ResetPassword' */)
});

export default provideHooks(hooks)(ResetPassword);

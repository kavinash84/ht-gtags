import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { getReturnPolicy, gotData } from 'redux/modules/services';
import { RETURN_POLICY as RETURN_POLICY_API } from 'helpers/apiUrls';

const ReturnPolicy = HomeTownLoader({
  loader: () => import('./ReturnPolicy' /* webpackChunkName: 'ReturnPolicy' */)
});

// export default ReturnPolicy;
const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!gotData(getState(), 'returnpolicy')) {
      await dispatch(getReturnPolicy(RETURN_POLICY_API, 'returnpolicy'));
    }
  }
};

export default provideHooks(hooks)(ReturnPolicy);

import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import HomeTownLoader from 'containers/Loader';
import { loadStaticPage, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import { PRIVACY } from 'helpers/apiUrls';

const hooks = {
  defer: ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'privacy')) {
      wrapDispatch(dispatch, 'privacy')(loadStaticPage(PRIVACY)).catch(error => console.log(error));
    }
  }
};

const PrivacyPolicy = HomeTownLoader({
  loader: () => import('./PrivacyPolicy' /* webpackChunkName: 'PrivacyPolicy' */)
});

export default provideHooks(hooks)(PrivacyPolicy);

import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import HomeTownLoader from 'containers/Loader';
import { loadStaticPage, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import { TERMS } from 'helpers/apiUrls';

const hooks = {
  defer: ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'terms')) {
      wrapDispatch(dispatch, 'terms')(loadStaticPage(TERMS)).catch(error => console.log(error));
    }
  }
};

const Terms = HomeTownLoader({
  loader: () => import('./Terms' /* webpackChunkName: 'Terms' */)
});

export default provideHooks(hooks)(Terms);

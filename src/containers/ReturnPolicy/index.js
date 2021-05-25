import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import HomeTownLoader from 'containers/Loader';
import { loadStaticPage, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import { RETURN } from 'helpers/apiUrls';

const hooks = {
  defer: ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'returnpolicy')) {
      wrapDispatch(dispatch, 'returnpolicy')(loadStaticPage(RETURN)).catch(error => console.log(error));
    }
  }
};

const ReturnPolicy = HomeTownLoader({
  loader: () => import('./ReturnPolicy' /* webpackChunkName: 'ReturnPolicy' */)
});

export default provideHooks(hooks)(ReturnPolicy);

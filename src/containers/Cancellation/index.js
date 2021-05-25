import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import HomeTownLoader from 'containers/Loader';
import { loadStaticPage, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import { CANCELLATION } from 'helpers/apiUrls';

const hooks = {
  defer: ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'cancellation')) {
      wrapDispatch(dispatch, 'cancellation')(loadStaticPage(CANCELLATION)).catch(error => console.log(error));
    }
  }
};

const Cancellation = HomeTownLoader({
  loader: () => import('./Cancellation' /* webpackChunkName: 'Cancellation' */)
});

export default provideHooks(hooks)(Cancellation);

import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import {
  loadTopSelling,
  // loadHashTags,
  loadOfferStrip,
  loadRecentlyViewed,
  isLoaded as isSectionLoaded
} from 'redux/modules/homepage';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';

const hooks = {
  defer: ({ store: { dispatch, getState } }) => {
    const { userLogin: { loggingOut } } = getState();
    if (!isSectionLoaded(getState(), 'products')) {
      wrapDispatch(dispatch, 'products')(loadTopSelling()).catch(error => console.log(error));
    }
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
    // if (!isSectionLoaded(getState(), 'hashtags')) {
    //   wrapDispatch(dispatch, 'hashtags')(loadHashTags()).catch(error => console.log(error));
    // }
    if (!isSectionLoaded(getState(), 'offerstrip')) {
      wrapDispatch(dispatch, 'offerstrip')(loadOfferStrip()).catch(error => console.log(error));
    }
    if (!loggingOut) {
      wrapDispatch(dispatch, 'recentlyviewed')(loadRecentlyViewed()).catch(error => console.log(error));
    }
  }
};

const Home = HomeTownLoader({
  loader: () => import('./Home' /* webpackChunkName: 'Home' */)
});

export default provideHooks(hooks)(Home);
